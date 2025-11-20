const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');

// Get summary report for date range
router.get('/summary', async (req, res) => {
    try {
        const { startDate, endDate } = req.query;

        if (!startDate || !endDate) {
            return res.status(400).json({ message: 'Start date and end date are required' });
        }

        const transactions = await Transaction.find({
            userId: req.user.userId,
            date: {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
            }
        });

        const income = transactions
            .filter(t => t.type === 'income')
            .reduce((sum, t) => sum + t.amount, 0);

        const expense = transactions
            .filter(t => t.type === 'expense')
            .reduce((sum, t) => sum + t.amount, 0);

        const summary = {
            totalIncome: income,
            totalExpense: expense,
            balance: income - expense,
            transactionCount: transactions.length,
            averageTransaction: transactions.length > 0 ? (income + expense) / transactions.length : 0
        };

        res.json(summary);
    } catch (error) {
        console.error('Error generating summary:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get category breakdown
router.get('/category-breakdown', async (req, res) => {
    try {
        const { startDate, endDate, type } = req.query;

        const matchQuery = {
            userId: req.user.userId,
            date: {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
            }
        };

        if (type) {
            matchQuery.type = type;
        }

        const breakdown = await Transaction.aggregate([
            { $match: matchQuery },
            {
                $group: {
                    _id: '$category',
                    total: { $sum: '$amount' },
                    count: { $sum: 1 }
                }
            },
            { $sort: { total: -1 } }
        ]);

        // Calculate total for percentage
        const total = breakdown.reduce((sum, item) => sum + item.total, 0);

        const result = breakdown.map(item => ({
            category: item._id,
            amount: item.total,
            count: item.count,
            percentage: total > 0 ? (item.total / total) * 100 : 0
        }));

        res.json(result);
    } catch (error) {
        console.error('Error generating category breakdown:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get top expenses
router.get('/top-expenses', async (req, res) => {
    try {
        const { startDate, endDate, limit = 10 } = req.query;

        const topExpenses = await Transaction.find({
            userId: req.user.userId,
            type: 'expense',
            date: {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
            }
        })
            .sort({ amount: -1 })
            .limit(parseInt(limit));

        res.json(topExpenses);
    } catch (error) {
        console.error('Error fetching top expenses:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get monthly trends
router.get('/trends', async (req, res) => {
    try {
        const { year } = req.query;
        const currentYear = year ? parseInt(year) : new Date().getFullYear();

        const trends = await Transaction.aggregate([
            {
                $match: {
                    userId: req.user.userId,
                    date: {
                        $gte: new Date(`${currentYear}-01-01`),
                        $lte: new Date(`${currentYear}-12-31`)
                    }
                }
            },
            {
                $group: {
                    _id: {
                        month: { $month: '$date' },
                        type: '$type'
                    },
                    total: { $sum: '$amount' }
                }
            },
            { $sort: { '_id.month': 1 } }
        ]);

        // Format data by month
        const monthlyData = Array.from({ length: 12 }, (_, i) => ({
            month: i + 1,
            income: 0,
            expense: 0
        }));

        trends.forEach(item => {
            const monthIndex = item._id.month - 1;
            if (item._id.type === 'income') {
                monthlyData[monthIndex].income = item.total;
            } else {
                monthlyData[monthIndex].expense = item.total;
            }
        });

        res.json(monthlyData);
    } catch (error) {
        console.error('Error generating trends:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get monthly comparison
router.get('/monthly-comparison', async (req, res) => {
    try {
        const { month, year } = req.query;
        const currentMonth = month ? parseInt(month) : new Date().getMonth() + 1;
        const currentYear = year ? parseInt(year) : new Date().getFullYear();

        // Current month
        const currentStart = new Date(currentYear, currentMonth - 1, 1);
        const currentEnd = new Date(currentYear, currentMonth, 0);

        // Previous month
        const prevMonth = currentMonth === 1 ? 12 : currentMonth - 1;
        const prevYear = currentMonth === 1 ? currentYear - 1 : currentYear;
        const prevStart = new Date(prevYear, prevMonth - 1, 1);
        const prevEnd = new Date(prevYear, prevMonth, 0);

        const [currentData, prevData] = await Promise.all([
            Transaction.aggregate([
                {
                    $match: {
                        userId: req.user.userId,
                        date: { $gte: currentStart, $lte: currentEnd }
                    }
                },
                {
                    $group: {
                        _id: '$type',
                        total: { $sum: '$amount' }
                    }
                }
            ]),
            Transaction.aggregate([
                {
                    $match: {
                        userId: req.user.userId,
                        date: { $gte: prevStart, $lte: prevEnd }
                    }
                },
                {
                    $group: {
                        _id: '$type',
                        total: { $sum: '$amount' }
                    }
                }
            ])
        ]);

        const formatData = (data) => {
            const income = data.find(d => d._id === 'income')?.total || 0;
            const expense = data.find(d => d._id === 'expense')?.total || 0;
            return { income, expense, balance: income - expense };
        };

        const current = formatData(currentData);
        const previous = formatData(prevData);

        const comparison = {
            current,
            previous,
            changes: {
                income: previous.income > 0 ? ((current.income - previous.income) / previous.income) * 100 : 0,
                expense: previous.expense > 0 ? ((current.expense - previous.expense) / previous.expense) * 100 : 0,
                balance: previous.balance !== 0 ? ((current.balance - previous.balance) / Math.abs(previous.balance)) * 100 : 0
            }
        };

        res.json(comparison);
    } catch (error) {
        console.error('Error generating monthly comparison:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
