const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');

// Get all notifications for current user
router.get('/', async (req, res) => {
    try {
        const { page = 1, limit = 20, type, isRead } = req.query;
        const query = { userId: req.user.userId };

        // Filter by type if provided
        if (type) {
            query.type = type;
        }

        // Filter by read status if provided
        if (isRead !== undefined) {
            query.isRead = isRead === 'true';
        }

        const notifications = await Notification.find(query)
            .sort({ createdAt: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .lean();

        const count = await Notification.countDocuments(query);

        res.json({
            notifications,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
            total: count
        });
    } catch (error) {
        console.error('Error fetching notifications:', error);
        res.status(500).json({ message: 'Error fetching notifications' });
    }
});

// Get unread count
router.get('/unread-count', async (req, res) => {
    try {
        const count = await Notification.countDocuments({
            userId: req.user.userId,
            isRead: false
        });

        res.json({ count });
    } catch (error) {
        console.error('Error fetching unread count:', error);
        res.status(500).json({ message: 'Error fetching unread count' });
    }
});

// Mark notification as read
router.patch('/:id/read', async (req, res) => {
    try {
        const notification = await Notification.findOneAndUpdate(
            { _id: req.params.id, userId: req.user.userId },
            { isRead: true },
            { new: true }
        );

        if (!notification) {
            return res.status(404).json({ message: 'Notification not found' });
        }

        res.json(notification);
    } catch (error) {
        console.error('Error marking notification as read:', error);
        res.status(500).json({ message: 'Error updating notification' });
    }
});

// Mark all notifications as read
router.patch('/mark-all-read', async (req, res) => {
    try {
        await Notification.updateMany(
            { userId: req.user.userId, isRead: false },
            { isRead: true }
        );

        res.json({ message: 'All notifications marked as read' });
    } catch (error) {
        console.error('Error marking all notifications as read:', error);
        res.status(500).json({ message: 'Error updating notifications' });
    }
});

// Delete notification
router.delete('/:id', async (req, res) => {
    try {
        const notification = await Notification.findOneAndDelete({
            _id: req.params.id,
            userId: req.user.userId
        });

        if (!notification) {
            return res.status(404).json({ message: 'Notification not found' });
        }

        res.json({ message: 'Notification deleted successfully' });
    } catch (error) {
        console.error('Error deleting notification:', error);
        res.status(500).json({ message: 'Error deleting notification' });
    }
});

// Create notification (for testing/admin)
router.post('/', async (req, res) => {
    try {
        const { type, title, message, relatedId, relatedModel, priority } = req.body;

        const notification = new Notification({
            userId: req.user.userId,
            type,
            title,
            message,
            relatedId,
            relatedModel,
            priority: priority || 'medium'
        });

        await notification.save();

        res.status(201).json(notification);
    } catch (error) {
        console.error('Error creating notification:', error);
        res.status(500).json({ message: 'Error creating notification' });
    }
});

module.exports = router;
