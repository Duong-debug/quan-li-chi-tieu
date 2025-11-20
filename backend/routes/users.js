const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { requireAdmin, requireManager } = require('../middleware/roleMiddleware');

// Get all users (Manager and Admin can view)
router.get('/', requireManager(), async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch users', error: error.message });
    }
});

// Update user role (Admin only)
router.patch('/:id/role', requireAdmin(), async (req, res) => {
    try {
        const { role } = req.body;

        if (!['user', 'manager', 'admin'].includes(role)) {
            return res.status(400).json({ message: 'Invalid role' });
        }

        const user = await User.findByIdAndUpdate(
            req.params.id,
            { role },
            { new: true }
        ).select('-password');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'Role updated successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update role', error: error.message });
    }
});

// Delete user (Admin only) - Cascade delete all related data
router.delete('/:id', requireAdmin(), async (req, res) => {
    try {
        const userId = req.params.id;

        // Check if user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Import all models for cascade delete
        const Transaction = require('../models/Transaction');
        const Income = require('../models/Income');
        const Category = require('../models/Category');
        const Budget = require('../models/Budget');
        const Goal = require('../models/Goal');
        const RecurringTransaction = require('../models/RecurringTransaction');
        const Notification = require('../models/Notification');

        console.log(`Deleting user ${user.email} and all related data...`);

        // Delete all related data in parallel
        const deleteResults = await Promise.all([
            Transaction.deleteMany({ userId }),
            Income.deleteMany({ userId }),
            Category.deleteMany({ userId }),
            Budget.deleteMany({ userId }),
            Goal.deleteMany({ userId }),
            RecurringTransaction.deleteMany({ userId }),
            Notification.deleteMany({ userId })
        ]);

        console.log('Delete results:', {
            transactions: deleteResults[0].deletedCount,
            income: deleteResults[1].deletedCount,
            categories: deleteResults[2].deletedCount,
            budgets: deleteResults[3].deletedCount,
            goals: deleteResults[4].deletedCount,
            recurring: deleteResults[5].deletedCount,
            notifications: deleteResults[6].deletedCount
        });

        // Finally delete the user
        await User.findByIdAndDelete(userId);

        res.json({
            message: 'User and all related data deleted successfully',
            deletedUser: user.email,
            deletedCounts: {
                transactions: deleteResults[0].deletedCount,
                income: deleteResults[1].deletedCount,
                categories: deleteResults[2].deletedCount,
                budgets: deleteResults[3].deletedCount,
                goals: deleteResults[4].deletedCount,
                recurring: deleteResults[5].deletedCount,
                notifications: deleteResults[6].deletedCount
            }
        });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Failed to delete user', error: error.message });
    }
});

// Get current user profile
router.get('/profile', async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch profile', error: error.message });
    }
});

module.exports = router;
