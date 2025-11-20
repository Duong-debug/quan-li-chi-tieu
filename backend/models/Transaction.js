const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  type: {
    type: String,
    enum: ['income', 'expense'],
    default: 'expense',
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  category: {
    type: String,
    enum: ['food', 'transportation', 'entertainment', 'utilities', 'health', 'education', 'shopping', 'other', 'Food', 'Transport', 'Entertainment', 'Utilities', 'Health', 'Education', 'Shopping', 'Other', 'salary', 'freelance', 'investment', 'gift', 'Salary', 'Freelance', 'Investment', 'Gift'],
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  note: {
    type: String,
  },
  title: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Transaction', transactionSchema);
