import express from 'express';

const router = express.Router();

// All payment endpoints disabled for now.
// This keeps the /api/payment/* URLs valid but prevents any real payment processing.
router.all('*', (req, res) => {
  res.status(503).json({
    message: 'Online payment is currently disabled. Please use Cash on Delivery.',
  });
});

export default router;