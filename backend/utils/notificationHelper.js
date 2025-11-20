const Notification = require('../models/Notification');

/**
 * Create a budget alert notification
 * @param {String} userId - User ID
 * @param {Object} budget - Budget object
 * @param {Number} percentage - Percentage of budget used
 */
async function createBudgetAlertNotification(userId, budget, percentage) {
    try {
        const notification = new Notification({
            userId,
            type: 'budget_alert',
            title: 'Budget Alert',
            message: `You have used ${percentage.toFixed(0)}% of your ${budget.category} budget for ${budget.period}`,
            relatedId: budget._id,
            relatedModel: 'Budget',
            priority: percentage >= 90 ? 'high' : 'medium'
        });

        await notification.save();
        return notification;
    } catch (error) {
        console.error('Error creating budget alert notification:', error);
        throw error;
    }
}

/**
 * Create a goal achieved notification
 * @param {String} userId - User ID
 * @param {Object} goal - Goal object
 */
async function createGoalAchievedNotification(userId, goal) {
    try {
        const notification = new Notification({
            userId,
            type: 'goal_achieved',
            title: 'Goal Achieved! 🎉',
            message: `Congratulations! You've reached your goal: ${goal.name}`,
            relatedId: goal._id,
            relatedModel: 'Goal',
            priority: 'high'
        });

        await notification.save();
        return notification;
    } catch (error) {
        console.error('Error creating goal achieved notification:', error);
        throw error;
    }
}

/**
 * Create a goal milestone notification
 * @param {String} userId - User ID
 * @param {Object} goal - Goal object
 * @param {Number} percentage - Percentage of goal achieved
 */
async function createGoalMilestoneNotification(userId, goal, percentage) {
    try {
        const notification = new Notification({
            userId,
            type: 'goal_achieved',
            title: 'Goal Progress',
            message: `You've reached ${percentage}% of your goal: ${goal.name}`,
            relatedId: goal._id,
            relatedModel: 'Goal',
            priority: 'medium'
        });

        await notification.save();
        return notification;
    } catch (error) {
        console.error('Error creating goal milestone notification:', error);
        throw error;
    }
}

/**
 * Create a recurring transaction notification
 * @param {String} userId - User ID
 * @param {Object} transaction - Transaction object
 */
async function createRecurringTransactionNotification(userId, transaction) {
    try {
        const notification = new Notification({
            userId,
            type: 'recurring_transaction',
            title: 'Recurring Transaction Processed',
            message: `${transaction.description || 'Transaction'} - ${transaction.amount} ${transaction.currency || 'VND'}`,
            relatedId: transaction._id,
            relatedModel: 'Transaction',
            priority: 'low'
        });

        await notification.save();
        return notification;
    } catch (error) {
        console.error('Error creating recurring transaction notification:', error);
        throw error;
    }
}

/**
 * Create a custom reminder notification
 * @param {String} userId - User ID
 * @param {String} title - Notification title
 * @param {String} message - Notification message
 * @param {String} priority - Priority level (low, medium, high)
 */
async function createReminderNotification(userId, title, message, priority = 'medium') {
    try {
        const notification = new Notification({
            userId,
            type: 'reminder',
            title,
            message,
            priority
        });

        await notification.save();
        return notification;
    } catch (error) {
        console.error('Error creating reminder notification:', error);
        throw error;
    }
}

/**
 * Create a system notification
 * @param {String} userId - User ID
 * @param {String} title - Notification title
 * @param {String} message - Notification message
 */
async function createSystemNotification(userId, title, message) {
    try {
        const notification = new Notification({
            userId,
            type: 'system',
            title,
            message,
            priority: 'medium'
        });

        await notification.save();
        return notification;
    } catch (error) {
        console.error('Error creating system notification:', error);
        throw error;
    }
}

module.exports = {
    createBudgetAlertNotification,
    createGoalAchievedNotification,
    createGoalMilestoneNotification,
    createRecurringTransactionNotification,
    createReminderNotification,
    createSystemNotification
};
