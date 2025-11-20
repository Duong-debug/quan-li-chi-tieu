const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    type: {
        type: String,
        enum: ['budget_alert', 'recurring_transaction', 'goal_achieved', 'system', 'reminder'],
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    relatedId: {
        type: mongoose.Schema.Types.ObjectId,
    },
    relatedModel: {
        type: String,
        enum: ['Transaction', 'Budget', 'RecurringTransaction', 'Goal'],
    },
    isRead: {
        type: Boolean,
        default: false,
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'medium',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Notification', notificationSchema);
