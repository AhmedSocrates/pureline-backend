const asyncHandler = require('express-async-handler');
const Order = require('../models/Order');

// @desc    Create new order
// @route   POST /api/orders
// @access  Public (guest checkout allowed)
const createOrder = asyncHandler(async (req, res) => {
    const { customer, items, subtotal, shipping, total } = req.body;

    // Validation
    if (!customer || !items || items.length === 0) {
        res.status(400);
        throw new Error('No order items provided');
    }

    if (!customer.name || !customer.email || !customer.phone || !customer.address) {
        res.status(400);
        throw new Error('Please provide all customer information');
    }

    const order = await Order.create({
        user: req.user ? req.user._id : null, // Optional user reference
        customer,
        items,
        subtotal,
        shipping,
        total,
        status: 'pending',
    });

    res.status(201).json(order);
});

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = asyncHandler(async (req, res) => {
    const { status, search } = req.query;

    let query = {};

    // Filter by status
    if (status && status !== 'all') {
        query.status = status;
    }

    // Search by customer email or name
    if (search) {
        query.$or = [
            { 'customer.email': { $regex: search, $options: 'i' } },
            { 'customer.name': { $regex: search, $options: 'i' } },
        ];
    }

    const orders = await Order.find(query)
        .populate('items.product', 'name category')
        .sort({ createdAt: -1 });

    res.json(orders);
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private (Admin or order owner)
const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate(
        'items.product',
        'name category'
    );

    if (order) {
        // Check if user is admin or order owner
        if (
            req.user.role === 'admin' ||
            (order.user && order.user.toString() === req.user._id.toString())
        ) {
            res.json(order);
        } else {
            res.status(403);
            throw new Error('Not authorized to view this order');
        }
    } else {
        res.status(404);
        throw new Error('Order not found');
    }
});

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
const updateOrderStatus = asyncHandler(async (req, res) => {
    const { status } = req.body;

    // Validate status
    const validStatuses = ['pending', 'processing', 'completed', 'cancelled'];
    if (!validStatuses.includes(status)) {
        res.status(400);
        throw new Error('Invalid status value');
    }

    const order = await Order.findById(req.params.id);

    if (order) {
        order.status = status;
        const updatedOrder = await order.save();
        res.json(updatedOrder);
    } else {
        res.status(404);
        throw new Error('Order not found');
    }
});

// @desc    Get order statistics (for admin dashboard)
// @route   GET /api/orders/stats/summary
// @access  Private/Admin
const getOrderStats = asyncHandler(async (req, res) => {
    const totalOrders = await Order.countDocuments();

    const revenueResult = await Order.aggregate([
        { $match: { status: { $ne: 'cancelled' } } },
        { $group: { _id: null, total: { $sum: '$total' } } },
    ]);

    const totalRevenue = revenueResult.length > 0 ? revenueResult[0].total : 0;

    const statusBreakdown = await Order.aggregate([
        { $group: { _id: '$status', count: { $sum: 1 } } },
    ]);

    const recentOrders = await Order.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .select('customer.name total status createdAt');

    res.json({
        totalOrders,
        totalRevenue,
        statusBreakdown: statusBreakdown.reduce((acc, item) => {
            acc[item._id] = item.count;
            return acc;
        }, {}),
        recentOrders,
    });
});

module.exports = {
    createOrder,
    getOrders,
    getOrderById,
    updateOrderStatus,
    getOrderStats,
};
