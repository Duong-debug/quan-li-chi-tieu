const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// POST /auth/register
router.post('/register', async (req, res, next) => {
  try {
    const { fullName, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = new User({ fullName, email, password });
    await user.save();

    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role || 'user' },
      process.env.JWT_SECRET || 'secret_key',
      { expiresIn: '24h' }
    );

    const userObject = user.toObject();
    delete userObject.password; // Remove password from response
    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: userObject
    });
  } catch (err) {
    next(err);
  }
});

// POST /auth/login
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log('Login attempt for:', email);

    const user = await User.findOne({ email });
    if (!user) {
      console.log('User not found');
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    console.log('User found, comparing password...');
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      console.log('Password invalid');
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    console.log('Password valid, signing token...');
    // Ensure role exists (for existing users that don't have role field)
    const userRole = user.role || 'user';

    const token = jwt.sign(
      { userId: user._id, email: user.email, role: userRole },
      process.env.JWT_SECRET || 'secret_key',
      { expiresIn: '24h' }
    );

    // Update user role if it doesn't exist
    if (!user.role) {
      user.role = 'user';
      await user.save();
    }

    console.log('Token signed, sending response');
    const userObject = user.toObject();
    delete userObject.password; // Remove password from response
    res.status(200).json({
      message: 'Login successful',
      token,
      user: { ...userObject, role: userRole }
    });
  } catch (err) {
    console.error('Login error details:', err);
    next(err);
  }
});

// POST /auth/change-password (requires authentication)
router.post('/change-password', async (req, res, next) => {
  try {
    // Get token from header
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret_key');
    const { currentPassword, newPassword } = req.body;

    // Validation
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: 'Current password and new password are required' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ message: 'New password must be at least 6 characters long' });
    }

    // Find user
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Verify current password
    const isPasswordValid = await user.comparePassword(currentPassword);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    // Update password
    user.password = newPassword;
    await user.save();

    res.status(200).json({ message: 'Password changed successfully' });
  } catch (err) {
    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Invalid token' });
    }
    console.error('Change password error:', err);
    next(err);
  }
});

module.exports = router;
