const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');
const geminiService = require('../services/geminiService');

// POST /ai/categorize - Auto categorize transaction using Gemini AI
router.post('/categorize', async (req, res, next) => {
  try {
    const { description, amount } = req.body;
    
    if (!description) {
      return res.status(400).json({ message: 'Description is required' });
    }

    const result = await geminiService.categorizeTransaction(description, amount || 0);
    
    res.json(result);
  } catch (err) {
    next(err);
  }
});

// GET /ai/predict - Predict next month expenses using Gemini AI
router.get('/predict', async (req, res, next) => {
  try {
    const transactions = await Transaction.find({ 
      userId: req.user.userId,
      type: 'expense'
    }).sort({ date: -1 }).limit(100);

    if (transactions.length < 3) {
      return res.json({
        message: 'Cần ít nhất 3 giao dịch để dự đoán',
        predictedAmount: 0,
        trend: 'stable',
        confidence: 0
      });
    }

    const prediction = await geminiService.predictExpenses(transactions);
    
    if (!prediction) {
      return res.json({
        message: 'Không thể dự đoán lúc này',
        predictedAmount: 0,
        trend: 'stable',
        confidence: 0
      });
    }

    res.json(prediction);
  } catch (err) {
    next(err);
  }
});

// GET /ai/suggestions - Get savings suggestions using Gemini AI
router.get('/suggestions', async (req, res, next) => {
  try {
    const transactions = await Transaction.find({ 
      userId: req.user.userId 
    }).sort({ date: -1 }).limit(100);

    if (transactions.length < 5) {
      return res.json({ 
        suggestions: [],
        message: 'Cần ít nhất 5 giao dịch để phân tích'
      });
    }

    const income = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const expenses = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    const suggestions = await geminiService.generateSavingsSuggestions(
      transactions, 
      income, 
      expenses
    );
    
    res.json({ suggestions });
  } catch (err) {
    next(err);
  }
});

// GET /ai/insights - Get spending insights using Gemini AI
router.get('/insights', async (req, res, next) => {
  try {
    const transactions = await Transaction.find({ 
      userId: req.user.userId,
      type: 'expense'
    }).sort({ date: -1 }).limit(100);

    if (transactions.length < 5) {
      return res.json({ 
        insights: [],
        message: 'Cần ít nhất 5 giao dịch để phân tích'
      });
    }

    const analysis = await geminiService.analyzeSpendingPatterns(transactions);
    
    res.json(analysis);
  } catch (err) {
    next(err);
  }
});

// GET /ai/status - Check if AI is available
router.get('/status', (req, res) => {
  res.json({
    available: geminiService.isAvailable(),
    provider: 'Google Gemini',
    model: 'gemini-pro'
  });
});

module.exports = router;
