const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            default: null, // Allow guest checkout
        },
        customer: {
            name: {
                type: String,
                required: [true, 'Customer name is required'],
            },
            email: {
                type: String,
                required: [true, 'Customer email is required'],
                match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
            },
            phone: {
                type: String,
                required: [true, 'Phone number is required'],
            },
            address: {
                type: String,
                required: [true, 'Address is required'],
            },
            city: {
                type: String,
                required: [true, 'City is required'],
            },
            state: {
                type: String,
                required: [true, 'State is required'],
            },
            zipCode: {
                type: String,
                required: [true, 'ZIP code is required'],
            },
            notes: {
                type: String,
                default: '',
            },
        },
        items: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product',
                    required: true,
                },
                name: {
                    type: String,
                    required: true,
                },
                price: {
                    type: Number,
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                    min: [1, 'Quantity must be at least 1'],
                },
                image: {
                    type: String,
                },
                category: {
                    type: String,
                },
            },
        ],
        subtotal: {
            type: Number,
            required: true,
            min: [0, 'Subtotal cannot be negative'],
        },
        shipping: {
            type: Number,
            required: true,
            default: 0,
            min: [0, 'Shipping cost cannot be negative'],
        },
        total: {
            type: Number,
            required: true,
            min: [0, 'Total cannot be negative'],
        },
        status: {
            type: String,
            enum: ['pending', 'processing', 'completed', 'cancelled'],
            default: 'pending',
        },
    },
    {
        timestamps: true,
    }
);

// Index for faster queries
orderSchema.index({ status: 1, createdAt: -1 });
orderSchema.index({ 'customer.email': 1 });

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
