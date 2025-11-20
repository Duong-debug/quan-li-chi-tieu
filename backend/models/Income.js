const mongoose = require('mongoose');

const IncomeSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    amount: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: String,
        enum: ['Salary', 'Freelance', 'Investment', 'Gift', 'Other'],
        default: 'Other'
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    description: {
        type: String,
        trim: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Income', IncomeSchema);
