const express = require('express');
const router = express.Router();
const {
    createOrder,
    getOrders,
    getOrderById,
    updateOrderStatus,
    getOrderStats,
} = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/adminMiddleware');

// Public route (guest checkout)
router.post('/', createOrder);

// Admin routes
router.get('/', protect, admin, getOrders);
router.get('/stats/summary', protect, admin, getOrderStats);

// Protected routes (admin or order owner)
router.get('/:id', protect, getOrderById);
router.put('/:id/status', protect, admin, updateOrderStatus);

module.exports = router;
