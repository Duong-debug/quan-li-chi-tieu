const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    type: {
        type: String,
        enum: ['daily', 'weekly', 'monthly', 'yearly', 'custom'],
        required: true,
    },
    period: {
        startDate: {
            type: Date,
            required: true,
        },
        endDate: {
            type: Date,
            required: true,
        },
    },
    summary: {
        totalIncome: {
            type: Number,
            default: 0,
        },
        totalExpense: {
            type: Number,
            default: 0,
        },
        balance: {
            type: Number,
            default: 0,
        },
        transactionCount: {
            type: Number,
            default: 0,
        },
    },
    categoryBreakdown: [{
        category: String,
        amount: Number,
        percentage: Number,
        transactionCount: Number,
    }],
    topExpenses: [{
        transactionId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Transaction',
        },
        title: String,
        amount: Number,
        category: String,
        date: Date,
    }],
    insights: [{
        type: {
            type: String,
            enum: ['warning', 'info', 'success', 'tip'],
        },
        message: String,
    }],
    generatedAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Report', reportSchema);
