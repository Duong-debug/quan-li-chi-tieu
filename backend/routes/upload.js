const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const User = require('../models/User');

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, '../uploads/avatars');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
        const uniqueName = `${req.user.userId}-${Date.now()}${path.extname(file.originalname)}`;
        cb(null, uniqueName);
    }
});

// File filter
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
        cb(null, true);
    } else {
        cb(new Error('Only JPG and PNG files are allowed'));
    }
};

// Configure multer
const upload = multer({
    storage,
    limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
    fileFilter
});

// Upload avatar
router.post('/avatar', upload.single('avatar'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        // Delete old avatar if exists
        const user = await User.findById(req.user.userId);
        if (user.avatar) {
            const oldAvatarPath = path.join(__dirname, '..', user.avatar);
            if (fs.existsSync(oldAvatarPath)) {
                fs.unlinkSync(oldAvatarPath);
            }
        }

        // Update user avatar
        const avatarUrl = `/uploads/avatars/${req.file.filename}`;
        user.avatar = avatarUrl;
        await user.save();

        res.json({
            message: 'Avatar uploaded successfully',
            avatar: avatarUrl
        });
    } catch (error) {
        console.error('Error uploading avatar:', error);

        // Delete uploaded file if error occurs
        if (req.file) {
            const filePath = path.join(uploadsDir, req.file.filename);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        }

        res.status(500).json({ message: error.message || 'Server error' });
    }
});

module.exports = router;
