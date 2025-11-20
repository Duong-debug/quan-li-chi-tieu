const mongoose = require('mongoose');

const recurringTransactionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    type: {
        type: String,
        enum: ['expense', 'income'],
        default: 'expense',
    },
    frequency: {
        type: String,
        enum: ['daily', 'weekly', 'monthly', 'yearly'],
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
    },
    nextOccurrence: {
        type: Date,
        required: true,
    },
    dayOfMonth: {
        type: Number,
        min: 1,
        max: 31,
    },
    dayOfWeek: {
        type: Number,
        min: 0,
        max: 6, // 0 = Sunday, 6 = Saturday
    },
    note: {
        type: String,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    lastProcessed: {
        type: Date,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

// Update updatedAt on save
recurringTransactionSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('RecurringTransaction', recurringTransactionSchema);
