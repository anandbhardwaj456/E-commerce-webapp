import express from 'express';
import Advertisement from '../models/Advertisement.js';
import { protect, admin } from '../middleware/auth.js';
import path from 'path';
import { fileURLToPath } from 'url';
import fetch from 'node-fetch';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Note: Local file uploads removed. Advertisements now accept image URLs.

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
router.post('/', async (req, res) => {
  try {
    let imageInput = req.body.image;
    // Convert URL image to data URL and store in DB
    const toDataUrl = async (urlOrData) => {
      if (typeof urlOrData !== 'string') return '';
      if (urlOrData.startsWith('data:')) return urlOrData;
      if (/^https?:\/\//i.test(urlOrData)) {
        try {
          const response = await fetch(urlOrData);
          if (!response.ok) throw new Error('Failed to fetch image');
          const contentType = response.headers.get('content-type') || 'image/jpeg';
          const buffer = Buffer.from(await response.arrayBuffer());
          const base64 = buffer.toString('base64');
          return `data:${contentType};base64,${base64}`;
        } catch (err) {
          console.error('Ad image fetch error:', err.message);
          return urlOrData; // fallback to original string
        }
      }
      return urlOrData;
    };

    const imageData = await toDataUrl(imageInput);

    const advertisement = new Advertisement({
      ...req.body,
      image: imageData,
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
router.put('/:id', async (req, res) => {
  try {
    const advertisement = await Advertisement.findById(req.params.id);

    if (!advertisement) {
      return res.status(404).json({ message: 'Advertisement not found' });
    }

    if (typeof req.body.image === 'string' && req.body.image.length) {
      const toDataUrl = async (urlOrData) => {
        if (typeof urlOrData !== 'string') return '';
        if (urlOrData.startsWith('data:')) return urlOrData;
        if (/^https?:\/\//i.test(urlOrData)) {
          try {
            const response = await fetch(urlOrData);
            if (!response.ok) throw new Error('Failed to fetch image');
            const contentType = response.headers.get('content-type') || 'image/jpeg';
            const buffer = Buffer.from(await response.arrayBuffer());
            const base64 = buffer.toString('base64');
            return `data:${contentType};base64,${base64}`;
          } catch (err) {
            console.error('Ad image fetch error:', err.message);
            return urlOrData; // fallback to original string
          }
        }
        return urlOrData;
      };
      req.body.image = await toDataUrl(req.body.image);
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

