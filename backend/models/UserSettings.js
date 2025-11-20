const mongoose = require('mongoose');

const userSettingsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true,
    },
    // Display Preferences
    currency: {
        type: String,
        default: 'VND',
    },
    language: {
        type: String,
        enum: ['vi', 'en'],
        default: 'vi',
    },
    theme: {
        type: String,
        enum: ['light', 'dark', 'system'],
        default: 'system',
    },
    dateFormat: {
        type: String,
        enum: ['DD/MM/YYYY', 'MM/DD/YYYY', 'YYYY-MM-DD'],
        default: 'DD/MM/YYYY',
    },

    // Notification Preferences
    emailNotifications: {
        budgetAlerts: { type: Boolean, default: true },
        weeklyReports: { type: Boolean, default: true },
        monthlyReports: { type: Boolean, default: true },
        goalReminders: { type: Boolean, default: true },
        recurringTransactions: { type: Boolean, default: true },
    },
    pushNotifications: {
        budgetAlerts: { type: Boolean, default: true },
        goalReminders: { type: Boolean, default: true },
        recurringTransactions: { type: Boolean, default: true },
    },

    // Budget & Financial Settings
    defaultBudgetPeriod: {
        type: String,
        enum: ['daily', 'weekly', 'monthly', 'yearly'],
        default: 'monthly',
    },
    budgetAlertThreshold: {
        type: Number,
        min: 0,
        max: 100,
        default: 80,
    },

    // Privacy & Security
    twoFactorEnabled: {
        type: Boolean,
        default: false,
    },
    sessionTimeout: {
        type: Number,
        default: 30, // minutes
    },

    // Data & Backup
    autoBackup: {
        type: Boolean,
        default: false,
    },
    backupFrequency: {
        type: String,
        enum: ['daily', 'weekly', 'monthly'],
        default: 'weekly',
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

// Update updatedAt on save
userSettingsSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('UserSettings', userSettingsSchema);
