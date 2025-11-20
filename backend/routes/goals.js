const express = require('express');
const router = express.Router();
const Goal = require('../models/Goal');

// Get all goals for user
router.get('/', async (req, res) => {
    try {
        const goals = await Goal.find({ userId: req.user.userId }).sort({ createdAt: -1 });

        // Calculate progress and status for each goal
        const goalsWithProgress = goals.map(goal => {
            const progress = {
                currentAmount: goal.currentAmount,
                targetAmount: goal.targetAmount,
                percentage: (goal.currentAmount / goal.targetAmount) * 100,
                remaining: goal.targetAmount - goal.currentAmount
            };

            let status = 'in_progress';
            if (goal.currentAmount >= goal.targetAmount) {
                status = 'completed';
            } else if (goal.deadline && new Date(goal.deadline) < new Date()) {
                status = 'overdue';
            }

            let daysLeft = null;
            if (goal.deadline) {
                const now = new Date();
                const end = new Date(goal.deadline);
                const diff = end - now;
                daysLeft = Math.ceil(diff / (1000 * 60 * 60 * 24));
            }

            return {
                ...goal.toObject(),
                progress,
                status,
                daysLeft
            };
        });

        res.json(goalsWithProgress);
    } catch (error) {
        console.error('Error fetching goals:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get active goals only
router.get('/active', async (req, res) => {
    try {
        const goals = await Goal.find({
            userId: req.user.userId,
            currentAmount: { $lt: '$targetAmount' }
        }).sort({ createdAt: -1 });

        const activeGoals = goals.filter(goal => {
            return goal.currentAmount < goal.targetAmount &&
                (!goal.deadline || new Date(goal.deadline) >= new Date());
        });

        res.json(activeGoals);
    } catch (error) {
        console.error('Error fetching active goals:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get single goal with progress
router.get('/:id', async (req, res) => {
    try {
        const goal = await Goal.findOne({
            _id: req.params.id,
            userId: req.user.userId
        });

        if (!goal) {
            return res.status(404).json({ message: 'Goal not found' });
        }

        const progress = {
            currentAmount: goal.currentAmount,
            targetAmount: goal.targetAmount,
            percentage: (goal.currentAmount / goal.targetAmount) * 100,
            remaining: goal.targetAmount - goal.currentAmount
        };

        let status = 'in_progress';
        if (goal.currentAmount >= goal.targetAmount) {
            status = 'completed';
        } else if (goal.deadline && new Date(goal.deadline) < new Date()) {
            status = 'overdue';
        }

        res.json({
            ...goal.toObject(),
            progress,
            status
        });
    } catch (error) {
        console.error('Error fetching goal:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Create new goal
router.post('/', async (req, res) => {
    try {
        const { name, targetAmount, currentAmount, deadline, description, icon } = req.body;

        if (!name || !targetAmount) {
            return res.status(400).json({ message: 'Name and target amount are required' });
        }

        const goal = new Goal({
            userId: req.user.userId,
            name,
            targetAmount,
            currentAmount: currentAmount || 0,
            deadline,
            description,
            icon: icon || '🎯'
        });

        await goal.save();
        res.status(201).json(goal);
    } catch (error) {
        console.error('Error creating goal:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update goal
router.put('/:id', async (req, res) => {
    try {
        const { name, targetAmount, currentAmount, deadline, description, icon } = req.body;

        const goal = await Goal.findOne({
            _id: req.params.id,
            userId: req.user.userId
        });

        if (!goal) {
            return res.status(404).json({ message: 'Goal not found' });
        }

        if (name) goal.name = name;
        if (targetAmount) goal.targetAmount = targetAmount;
        if (currentAmount !== undefined) goal.currentAmount = currentAmount;
        if (deadline !== undefined) goal.deadline = deadline;
        if (description !== undefined) goal.description = description;
        if (icon) goal.icon = icon;

        await goal.save();
        res.json(goal);
    } catch (error) {
        console.error('Error updating goal:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Delete goal
router.delete('/:id', async (req, res) => {
    try {
        const goal = await Goal.findOneAndDelete({
            _id: req.params.id,
            userId: req.user.userId
        });

        if (!goal) {
            return res.status(404).json({ message: 'Goal not found' });
        }

        res.json({ message: 'Goal deleted successfully' });
    } catch (error) {
        console.error('Error deleting goal:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Add contribution to goal
router.post('/:id/contribute', async (req, res) => {
    try {
        const { amount, note } = req.body;

        if (!amount || amount <= 0) {
            return res.status(400).json({ message: 'Valid amount is required' });
        }

        const goal = await Goal.findOne({
            _id: req.params.id,
            userId: req.user.userId
        });

        if (!goal) {
            return res.status(404).json({ message: 'Goal not found' });
        }

        // Add contribution
        goal.currentAmount += amount;
        goal.contributions.push({
            amount,
            note,
            date: new Date()
        });

        await goal.save();

        const progress = {
            currentAmount: goal.currentAmount,
            targetAmount: goal.targetAmount,
            percentage: (goal.currentAmount / goal.targetAmount) * 100,
            remaining: goal.targetAmount - goal.currentAmount
        };

        res.json({
            ...goal.toObject(),
            progress
        });
    } catch (error) {
        console.error('Error adding contribution:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
