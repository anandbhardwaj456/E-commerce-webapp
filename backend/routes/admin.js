import express from 'express';
import Product from '../models/Product.js';
import Order from '../models/Order.js';
import User from '../models/User.js';
import { protect, admin } from '../middleware/auth.js';
import path from 'path';
import { fileURLToPath } from 'url';
import fetch from 'node-fetch';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Note: Local file uploads removed. Products now accept external image URLs.

// All admin routes require authentication and admin role
router.use(protect);
router.use(admin);

// ==================== PRODUCT MANAGEMENT ====================

// @route   POST /api/admin/products
// @desc    Create new product (images provided as array of URLs)
// @access  Private/Admin
router.post('/products', async (req, res) => {
  try {
    // Accept images as array of URLs in body
    let images = [];
    if (Array.isArray(req.body.images)) {
      images = req.body.images;
    } else if (typeof req.body.images === 'string' && req.body.images.length) {
      try {
        const parsed = JSON.parse(req.body.images);
        if (Array.isArray(parsed)) images = parsed;
      } catch {
        images = [req.body.images];
      }
    }

    // Convert URL images to data URLs and store in DB
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
          console.error('Image fetch error:', err.message);
          return urlOrData; // fallback to original string
        }
      }
      return urlOrData;
    };

    const imagesData = await Promise.all(images.map((img) => toDataUrl(img)));

    const product = new Product({
      ...req.body,
      images: imagesData,
      price: parseFloat(req.body.price),
      stock: parseInt(req.body.stock),
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT /api/admin/products/:id
// @desc    Update product (images provided as array of URLs)
// @access  Private/Admin
router.put('/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Accept images as array of URLs or data URLs; convert URLs to data URLs
    let incomingImages = [];
    if (Array.isArray(req.body.images)) {
      incomingImages = req.body.images;
    } else if (typeof req.body.images === 'string' && req.body.images.length) {
      try {
        const parsed = JSON.parse(req.body.images);
        incomingImages = Array.isArray(parsed) ? parsed : [req.body.images];
      } catch {
        incomingImages = [req.body.images];
      }
    }

    if (incomingImages.length > 0) {
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
            console.error('Image fetch error:', err.message);
            return urlOrData; // fallback to original string
          }
        }
        return urlOrData;
      };
      req.body.images = await Promise.all(incomingImages.map((img) => toDataUrl(img)));
    }

    if (req.body.price) req.body.price = parseFloat(req.body.price);
    if (req.body.stock) req.body.stock = parseInt(req.body.stock);

    Object.assign(product, req.body);
    const updatedProduct = await product.save();

    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   DELETE /api/admin/products/:id
// @desc    Delete product
// @access  Private/Admin
router.delete('/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await product.deleteOne();
    res.json({ message: 'Product removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/admin/products
// @desc    Get all products (admin view - includes inactive)
// @access  Private/Admin
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find({}).sort('-createdAt');
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ==================== ORDER MANAGEMENT ====================

// @route   GET /api/admin/orders
// @desc    Get all orders
// @access  Private/Admin
router.get('/orders', async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate('user', 'name email')
      .populate('orderItems.product', 'name images')
      .sort('-createdAt');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT /api/admin/orders/:id/status
// @desc    Update order status
// @access  Private/Admin
router.put('/orders/:id/status', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.status = req.body.status;

    if (req.body.status === 'delivered') {
      order.isDelivered = true;
      order.deliveredAt = Date.now();
    }

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ==================== USER MANAGEMENT ====================

// @route   GET /api/admin/users
// @desc    Get all users
// @access  Private/Admin
router.get('/users', async (req, res) => {
  try {
    const users = await User.find({}).select('-password').sort('-createdAt');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT /api/admin/users/:id/block
// @desc    Block/Unblock user
// @access  Private/Admin
router.put('/users/:id/block', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.role === 'admin') {
      return res.status(400).json({ message: 'Cannot block admin user' });
    }

    user.isBlocked = req.body.isBlocked;
    await user.save();

    res.json({ message: `User ${user.isBlocked ? 'blocked' : 'unblocked'}` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ==================== STATISTICS ====================

// @route   GET /api/admin/stats
// @desc    Get admin statistics
// @access  Private/Admin
router.get('/stats', async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ role: 'user' });
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();
    const totalRevenue = await Order.aggregate([
      { $match: { isPaid: true } },
      { $group: { _id: null, total: { $sum: '$totalPrice' } } },
    ]);

    const recentOrders = await Order.find({})
      .populate('user', 'name email')
      .sort('-createdAt')
      .limit(5);

    res.json({
      totalUsers,
      totalProducts,
      totalOrders,
      totalRevenue: totalRevenue[0]?.total || 0,
      recentOrders,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;

