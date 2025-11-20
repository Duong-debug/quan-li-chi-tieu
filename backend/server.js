const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/expense-manager')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Error Handler Middleware
const errorHandler = (err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
  });
};

// JWT Verification Middleware
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET || 'secret_key');
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Serve static files
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/transactions', verifyToken, require('./routes/transactions'));
app.use('/api/categories', verifyToken, require('./routes/categories'));
app.use('/api/budgets', verifyToken, require('./routes/budgets'));
app.use('/api/recurring', verifyToken, require('./routes/recurring'));
app.use('/api/reports', verifyToken, require('./routes/reports'));
app.use('/api/goals', verifyToken, require('./routes/goals'));
app.use('/api/upload', verifyToken, require('./routes/upload'));
app.use('/api/ai', verifyToken, require('./routes/ai'));
app.use('/api/notifications', verifyToken, require('./routes/notifications'));
app.use('/api/income', verifyToken, require('./routes/income'));
app.use('/api/users', verifyToken, require('./routes/users'));

// Initialize cron job for recurring transactions
const cron = require('node-cron');
const { processRecurringTransactions } = require('./jobs/processRecurring');
cron.schedule('0 0 * * *', processRecurringTransactions); // Run daily at midnight
console.log('✅ Cron job for recurring transactions initialized');

// Error handling
app.use(errorHandler);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
