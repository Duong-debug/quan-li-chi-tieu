const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    targetAmount: {
        type: Number,
        required: true,
        min: 0,
    },
    currentAmount: {
        type: Number,
        default: 0,
        min: 0,
    },
    deadline: {
        type: Date,
    },
    category: {
        type: String,
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'medium',
    },
    status: {
        type: String,
        enum: ['active', 'completed', 'cancelled'],
        default: 'active',
    },
    icon: {
        type: String,
    },
    color: {
        type: String,
        default: '#3b82f6',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    completedAt: {
        type: Date,
    },
});

// Update updatedAt on save
goalSchema.pre('save', function (next) {
    this.updatedAt = Date.now();

    // Set completedAt when goal is completed
    if (this.status === 'completed' && !this.completedAt) {
        this.completedAt = Date.now();
    }

    next();
});

module.exports = mongoose.model('Goal', goalSchema);
