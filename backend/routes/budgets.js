const express = require('express');
const router = express.Router();
const Budget = require('../models/Budget');
const Transaction = require('../models/Transaction');

// Get all budgets for authenticated user
router.get('/', async (req, res) => {
    try {
        const budgets = await Budget.find({ userId: req.user.userId }).sort({ createdAt: -1 });
        res.json(budgets);
    } catch (error) {
        console.error('Error fetching budgets:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get current active budgets
router.get('/current', async (req, res) => {
    try {
        const now = new Date();
        const budgets = await Budget.find({
            userId: req.user.userId,
            isActive: true,
            startDate: { $lte: now },
            $or: [
                { endDate: { $exists: false } },
                { endDate: { $gte: now } }
            ]
        }).sort({ category: 1 });

        res.json(budgets);
    } catch (error) {
        console.error('Error fetching current budgets:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get budget progress (spent vs budget)
router.get('/:id/progress', async (req, res) => {
    try {
        const budget = await Budget.findOne({
            _id: req.params.id,
            userId: req.user.userId
        });

        if (!budget) {
            return res.status(404).json({ message: 'Budget not found' });
        }

        // Calculate spent amount for this budget period
        const endDate = budget.endDate || new Date();
        const spent = await Transaction.aggregate([
            {
                $match: {
                    userId: req.user.userId,
                    category: budget.category,
                    type: 'expense',
                    date: {
                        $gte: budget.startDate,
                        $lte: endDate
                    }
                }
            },
            {
                $group: {
                    _id: null,
                    total: { $sum: '$amount' }
                }
            }
        ]);

        const spentAmount = spent.length > 0 ? spent[0].total : 0;
        const percentage = budget.amount > 0 ? (spentAmount / budget.amount) * 100 : 0;
        const remaining = budget.amount - spentAmount;

        // Determine status
        let status = 'on_track';
        if (percentage >= 100) {
            status = 'exceeded';
        } else if (percentage >= budget.alertThreshold) {
            status = 'warning';
        }

        res.json({
            budget,
            spent: spentAmount,
            remaining,
            percentage: Math.round(percentage * 100) / 100,
            status
        });
    } catch (error) {
        console.error('Error calculating budget progress:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Create new budget
router.post('/', async (req, res) => {
    try {
        const { category, amount, period, startDate, endDate, alertThreshold } = req.body;

        // Validation
        if (!category || !amount || !period || !startDate) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        if (amount <= 0) {
            return res.status(400).json({ message: 'Budget amount must be positive' });
        }

        // Check for existing active budget for same category and period
        const existingBudget = await Budget.findOne({
            userId: req.user.userId,
            category,
            period,
            isActive: true,
            startDate: { $lte: new Date(endDate || Date.now()) },
            $or: [
                { endDate: { $exists: false } },
                { endDate: { $gte: new Date(startDate) } }
            ]
        });

        if (existingBudget) {
            return res.status(400).json({
                message: 'An active budget already exists for this category and period'
            });
        }

        const budget = new Budget({
            userId: req.user.userId,
            category,
            amount,
            period,
            startDate: new Date(startDate),
            endDate: endDate ? new Date(endDate) : undefined,
            alertThreshold: alertThreshold || 80,
            isActive: true
        });

        await budget.save();
        res.status(201).json(budget);
    } catch (error) {
        console.error('Error creating budget:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update budget
router.put('/:id', async (req, res) => {
    try {
        const { category, amount, period, startDate, endDate, alertThreshold, isActive } = req.body;

        const budget = await Budget.findOne({
            _id: req.params.id,
            userId: req.user.userId
        });

        if (!budget) {
            return res.status(404).json({ message: 'Budget not found' });
        }

        // Validation
        if (amount !== undefined && amount <= 0) {
            return res.status(400).json({ message: 'Budget amount must be positive' });
        }

        // Update fields
        if (category !== undefined) budget.category = category;
        if (amount !== undefined) budget.amount = amount;
        if (period !== undefined) budget.period = period;
        if (startDate !== undefined) budget.startDate = new Date(startDate);
        if (endDate !== undefined) budget.endDate = endDate ? new Date(endDate) : undefined;
        if (alertThreshold !== undefined) budget.alertThreshold = alertThreshold;
        if (isActive !== undefined) budget.isActive = isActive;

        await budget.save();
        res.json(budget);
    } catch (error) {
        console.error('Error updating budget:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Delete budget
router.delete('/:id', async (req, res) => {
    try {
        const budget = await Budget.findOneAndDelete({
            _id: req.params.id,
            userId: req.user.userId
        });

        if (!budget) {
            return res.status(404).json({ message: 'Budget not found' });
        }

        res.json({ message: 'Budget deleted successfully' });
    } catch (error) {
        console.error('Error deleting budget:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
