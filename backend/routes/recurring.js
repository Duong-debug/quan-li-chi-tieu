const express = require('express');
const router = express.Router();
const RecurringTransaction = require('../models/RecurringTransaction');

// Get all recurring transactions for user
router.get('/', async (req, res) => {
    try {
        const recurring = await RecurringTransaction.find({ userId: req.user.userId })
            .sort({ createdAt: -1 });
        res.json(recurring);
    } catch (error) {
        console.error('Error fetching recurring transactions:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get active recurring transactions
router.get('/active', async (req, res) => {
    try {
        const now = new Date();
        const recurring = await RecurringTransaction.find({
            userId: req.user.userId,
            isActive: true,
            startDate: { $lte: now },
            $or: [
                { endDate: { $exists: false } },
                { endDate: { $gte: now } }
            ]
        }).sort({ nextOccurrence: 1 });

        res.json(recurring);
    } catch (error) {
        console.error('Error fetching active recurring:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Create recurring transaction
router.post('/', async (req, res) => {
    try {
        const { title, category, amount, type, frequency, startDate, endDate, dayOfMonth, dayOfWeek, note } = req.body;

        // Validation
        if (!title || !category || !amount || !frequency || !startDate) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        if (amount <= 0) {
            return res.status(400).json({ message: 'Amount must be positive' });
        }

        // Calculate next occurrence
        const nextOccurrence = new Date(startDate);

        const recurring = new RecurringTransaction({
            userId: req.user.userId,
            title,
            category,
            amount,
            type: type || 'expense',
            frequency,
            startDate: new Date(startDate),
            endDate: endDate ? new Date(endDate) : undefined,
            nextOccurrence,
            dayOfMonth,
            dayOfWeek,
            note,
            isActive: true
        });

        await recurring.save();
        res.status(201).json(recurring);
    } catch (error) {
        console.error('Error creating recurring transaction:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update recurring transaction
router.put('/:id', async (req, res) => {
    try {
        const { title, category, amount, type, frequency, startDate, endDate, dayOfMonth, dayOfWeek, note, isActive } = req.body;

        const recurring = await RecurringTransaction.findOne({
            _id: req.params.id,
            userId: req.user.userId
        });

        if (!recurring) {
            return res.status(404).json({ message: 'Recurring transaction not found' });
        }

        // Update fields
        if (title !== undefined) recurring.title = title;
        if (category !== undefined) recurring.category = category;
        if (amount !== undefined) {
            if (amount <= 0) {
                return res.status(400).json({ message: 'Amount must be positive' });
            }
            recurring.amount = amount;
        }
        if (type !== undefined) recurring.type = type;
        if (frequency !== undefined) recurring.frequency = frequency;
        if (startDate !== undefined) recurring.startDate = new Date(startDate);
        if (endDate !== undefined) recurring.endDate = endDate ? new Date(endDate) : undefined;
        if (dayOfMonth !== undefined) recurring.dayOfMonth = dayOfMonth;
        if (dayOfWeek !== undefined) recurring.dayOfWeek = dayOfWeek;
        if (note !== undefined) recurring.note = note;
        if (isActive !== undefined) recurring.isActive = isActive;

        await recurring.save();
        res.json(recurring);
    } catch (error) {
        console.error('Error updating recurring transaction:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Pause/Resume recurring transaction
router.post('/:id/toggle', async (req, res) => {
    try {
        const recurring = await RecurringTransaction.findOne({
            _id: req.params.id,
            userId: req.user.userId
        });

        if (!recurring) {
            return res.status(404).json({ message: 'Recurring transaction not found' });
        }

        recurring.isActive = !recurring.isActive;
        await recurring.save();

        res.json({
            message: recurring.isActive ? 'Recurring transaction resumed' : 'Recurring transaction paused',
            recurring
        });
    } catch (error) {
        console.error('Error toggling recurring transaction:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Delete recurring transaction
router.delete('/:id', async (req, res) => {
    try {
        const recurring = await RecurringTransaction.findOneAndDelete({
            _id: req.params.id,
            userId: req.user.userId
        });

        if (!recurring) {
            return res.status(404).json({ message: 'Recurring transaction not found' });
        }

        res.json({ message: 'Recurring transaction deleted successfully' });
    } catch (error) {
        console.error('Error deleting recurring transaction:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
