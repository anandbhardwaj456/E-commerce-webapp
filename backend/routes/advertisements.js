import express from 'express';
import Advertisement from '../models/Advertisement.js';
import { protect, admin } from '../middleware/auth.js';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads/'));
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `ad-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif|webp/;
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'));
    }
  },
});

// @route   GET /api/advertisements
// @desc    Get all active advertisements
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { type } = req.query;
    const query = { isActive: true };
    
    if (type) {
      query.type = type;
    }

    const advertisements = await Advertisement.find(query)
      .sort('order')
      .sort('-createdAt');
    
    res.json(advertisements);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Admin routes
router.use(protect);
router.use(admin);

// @route   POST /api/advertisements
// @desc    Create advertisement
// @access  Private/Admin
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const imagePath = req.file ? `/uploads/${req.file.filename}` : req.body.image;

    const advertisement = new Advertisement({
      ...req.body,
      image: imagePath,
    });

    const createdAd = await advertisement.save();
    res.status(201).json(createdAd);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT /api/advertisements/:id
// @desc    Update advertisement
// @access  Private/Admin
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const advertisement = await Advertisement.findById(req.params.id);

    if (!advertisement) {
      return res.status(404).json({ message: 'Advertisement not found' });
    }

    if (req.file) {
      req.body.image = `/uploads/${req.file.filename}`;
    }

    Object.assign(advertisement, req.body);
    const updatedAd = await advertisement.save();

    res.json(updatedAd);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   DELETE /api/advertisements/:id
// @desc    Delete advertisement
// @access  Private/Admin
router.delete('/:id', async (req, res) => {
  try {
    const advertisement = await Advertisement.findById(req.params.id);

    if (!advertisement) {
      return res.status(404).json({ message: 'Advertisement not found' });
    }

    await advertisement.deleteOne();
    res.json({ message: 'Advertisement removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/advertisements/all
// @desc    Get all advertisements (admin view)
// @access  Private/Admin
router.get('/all', async (req, res) => {
  try {
    const advertisements = await Advertisement.find({})
      .sort('order')
      .sort('-createdAt');
    res.json(advertisements);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;

