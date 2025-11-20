const express = require('express');
const Transaction = require('../models/Transaction');

const router = express.Router();

// GET /transactions
router.get('/', async (req, res, next) => {
  try {
    const { type } = req.query;
    const filter = { userId: req.user.userId };
    
    // Filter by type if provided
    if (type) {
      filter.type = type;
    }
    
    const transactions = await Transaction.find(filter).sort({ date: -1 });
    res.status(200).json(transactions);
  } catch (err) {
    next(err);
  }
});

// GET /transactions/:id
router.get('/:id', async (req, res, next) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    res.status(200).json(transaction);
  } catch (err) {
    next(err);
  }
});

// POST /transactions
router.post('/', async (req, res, next) => {
  try {
    const { date, category, amount, note, type, title } = req.body;
    const transaction = new Transaction({
      userId: req.user.userId,
      type: type || 'expense',
      date,
      category,
      amount,
      note,
      title,
    });
    await transaction.save();
    res.status(201).json({ message: 'Transaction created', transaction });
  } catch (err) {
    next(err);
  }
});

// PUT /transactions/:id
router.put('/:id', async (req, res, next) => {
  try {
    const { date, category, amount, note, type, title } = req.body;
    const transaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      { date, category, amount, note, type, title },
      { new: true }
    );
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    res.status(200).json({ message: 'Transaction updated', transaction });
  } catch (err) {
    next(err);
  }
});

// DELETE /transactions/:id
router.delete('/:id', async (req, res, next) => {
  try {
    const transaction = await Transaction.findByIdAndDelete(req.params.id);
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    res.status(200).json({ message: 'Transaction deleted' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
