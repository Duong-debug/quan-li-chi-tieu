const express = require('express');
const router = express.Router();
const Income = require('../models/Income');

// Get all income records for authenticated user
router.get('/', async (req, res) => {
    try {
        const incomes = await Income.find({ userId: req.user.userId })
            .sort({ date: -1 });
        res.json(incomes);
    } catch (error) {
        console.error('Error fetching incomes:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get single income by ID
router.get('/:id', async (req, res) => {
    try {
        const income = await Income.findOne({
            _id: req.params.id,
            userId: req.user.userId
        });

        if (!income) {
            return res.status(404).json({ message: 'Income not found' });
        }

        res.json(income);
    } catch (error) {
        console.error('Error fetching income:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Create new income
router.post('/', async (req, res) => {
    try {
        const { title, amount, category, date, description } = req.body;

        const income = new Income({
            userId: req.user.userId,
            title,
            amount,
            category,
            date: date || new Date(),
            description
        });

        await income.save();
        res.status(201).json(income);
    } catch (error) {
        console.error('Error creating income:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update income
router.put('/:id', async (req, res) => {
    try {
        const { title, amount, category, date, description } = req.body;

        const income = await Income.findOneAndUpdate(
            { _id: req.params.id, userId: req.user.userId },
            { title, amount, category, date, description },
            { new: true, runValidators: true }
        );

        if (!income) {
            return res.status(404).json({ message: 'Income not found' });
        }

        res.json(income);
    } catch (error) {
        console.error('Error updating income:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Delete income
router.delete('/:id', async (req, res) => {
    try {
        const income = await Income.findOneAndDelete({
            _id: req.params.id,
            userId: req.user.userId
        });

        if (!income) {
            return res.status(404).json({ message: 'Income not found' });
        }

        res.json({ message: 'Income deleted successfully' });
    } catch (error) {
        console.error('Error deleting income:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get income statistics
router.get('/stats/summary', async (req, res) => {
    try {
        const incomes = await Income.find({ userId: req.user.userId });

        const totalIncome = incomes.reduce((sum, income) => sum + income.amount, 0);
        const categoryBreakdown = {};

        incomes.forEach(income => {
            const cat = income.category || 'Other';
            categoryBreakdown[cat] = (categoryBreakdown[cat] || 0) + income.amount;
        });

        res.json({
            total: totalIncome,
            count: incomes.length,
            categoryBreakdown
        });
    } catch (error) {
        console.error('Error fetching income stats:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
