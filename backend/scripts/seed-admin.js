const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const path = require('path');

// Load env vars
dotenv.config({ path: path.join(__dirname, '../.env') });

const seedAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/expense-manager');
        console.log('MongoDB connected');

        const adminEmail = 'admin@example.com';
        const adminPassword = 'adminpassword';
        const adminName = 'Admin User';

        const existingAdmin = await User.findOne({ email: adminEmail });
        if (existingAdmin) {
            console.log('Admin user already exists');
            process.exit(0);
        }

        const admin = new User({
            fullName: adminName,
            email: adminEmail,
            password: adminPassword,
            role: 'admin',
        });

        await admin.save();
        console.log('Admin user created successfully');
        console.log(`Email: ${adminEmail}`);
        console.log(`Password: ${adminPassword}`);
        process.exit(0);
    } catch (error) {
        console.error('Error seeding admin:', error);
        process.exit(1);
    }
};

seedAdmin();
