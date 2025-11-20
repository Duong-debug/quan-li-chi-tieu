const express = require('express');
const router = express.Router();
const Category = require('../models/Category');

// Get all categories for authenticated user with spending data
router.get('/', async (req, res) => {
    try {
        const categories = await Category.find({ userId: req.user.userId }).sort({ createdAt: -1 });
        
        // Calculate spent amount for each category
        const Transaction = require('../models/Transaction');
        const categoriesWithSpending = await Promise.all(
            categories.map(async (category) => {
                const spent = await Transaction.aggregate([
                    {
                        $match: {
                            userId: req.user.userId,
                            category: category.name
                        }
                    },
                    {
                        $group: {
                            _id: null,
                            total: { $sum: '$amount' }
                        }
                    }
                ]);
                
                return {
                    ...category.toObject(),
                    spent: spent.length > 0 ? spent[0].total : 0
                };
            })
        );
        
        res.json(categoriesWithSpending);
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Create new category
router.post('/', async (req, res) => {
    try {
        const { name, color, icon, budgetLimit } = req.body;

        // Validation
        if (!name || name.trim() === '') {
            return res.status(400).json({ message: 'Category name is required' });
        }

        // Check if category with same name already exists for this user
        const existingCategory = await Category.findOne({
            userId: req.user.userId,
            name: name.trim()
        });

        if (existingCategory) {
            return res.status(400).json({ message: 'Category with this name already exists' });
        }

        const category = new Category({
            userId: req.user.userId,
            name: name.trim(),
            color: color || '#3b82f6',
            icon: icon || '',
            budgetLimit: budgetLimit || 5000000,
        });

        await category.save();
        
        // Return with spent amount (0 for new category)
        res.status(201).json({
            ...category.toObject(),
            spent: 0
        });
    } catch (error) {
        console.error('Error creating category:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update category
router.put('/:id', async (req, res) => {
    try {
        const { name, color, icon, budgetLimit } = req.body;

        // Find category and verify ownership
        const category = await Category.findOne({
            _id: req.params.id,
            userId: req.user.userId
        });

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        // Validation
        if (!name || name.trim() === '') {
            return res.status(400).json({ message: 'Category name is required' });
        }

        // Check if another category with same name exists
        const existingCategory = await Category.findOne({
            userId: req.user.userId,
            name: name.trim(),
            _id: { $ne: req.params.id }
        });

        if (existingCategory) {
            return res.status(400).json({ message: 'Category with this name already exists' });
        }

        // Update fields
        category.name = name.trim();
        if (color) category.color = color;
        if (icon !== undefined) category.icon = icon;
        if (budgetLimit !== undefined) category.budgetLimit = budgetLimit;

        await category.save();
        
        // Calculate spent amount
        const Transaction = require('../models/Transaction');
        const spent = await Transaction.aggregate([
            {
                $match: {
                    userId: req.user.userId,
                    category: category.name
                }
            },
            {
                $group: {
                    _id: null,
                    total: { $sum: '$amount' }
                }
            }
        ]);
        
        res.json({
            ...category.toObject(),
            spent: spent.length > 0 ? spent[0].total : 0
        });
    } catch (error) {
        console.error('Error updating category:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Delete category
router.delete('/:id', async (req, res) => {
    try {
        // Find category and verify ownership
        const category = await Category.findOne({
            _id: req.params.id,
            userId: req.user.userId
        });

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        // Check if category is being used in any transactions
        const Transaction = require('../models/Transaction');
        const transactionCount = await Transaction.countDocuments({
            userId: req.user.userId,
            category: category.name
        });

        if (transactionCount > 0) {
            return res.status(400).json({ 
                message: `Cannot delete category. It is being used in ${transactionCount} transaction(s).`,
                transactionCount 
            });
        }

        // Check if category is being used in any budgets
        const Budget = require('../models/Budget');
        const budgetCount = await Budget.countDocuments({
            userId: req.user.userId,
            category: category.name
        });

        if (budgetCount > 0) {
            return res.status(400).json({ 
                message: `Cannot delete category. It is being used in ${budgetCount} budget(s).`,
                budgetCount 
            });
        }

        // Safe to delete
        await Category.findByIdAndDelete(req.params.id);
        res.json({ message: 'Category deleted successfully' });
    } catch (error) {
        console.error('Error deleting category:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
