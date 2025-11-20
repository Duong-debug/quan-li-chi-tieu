/**
 * Complete MongoDB Database Initialization Script
 * Creates all indexes for all 9 collections
 * 
 * Usage: node scripts/init-db-complete.js
 */

const mongoose = require('mongoose');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/expense-management';

async function initializeCompleteDatabase() {
    try {
        console.log('🔌 Connecting to MongoDB...');
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected to MongoDB successfully\n');

        const db = mongoose.connection.db;

        // Helper function
        async function createIndexSafely(collection, indexSpec, options) {
            try {
                await collection.createIndex(indexSpec, options);
                console.log(`  ✓ ${options.name}`);
                return true;
            } catch (error) {
                if (error.code === 85 || error.code === 86) {
                    console.log(`  ℹ ${options.name} (already exists)`);
                    return false;
                }
                throw error;
            }
        }

        // ==================== USERS ====================
        console.log('📊 Users Collection');
        const users = db.collection('users');
        await createIndexSafely(users, { email: 1 }, { unique: true, name: 'email_unique' });
        await createIndexSafely(users, { role: 1, createdAt: -1 }, { name: 'role_created' });

        // ==================== TRANSACTIONS ====================
        console.log('\n📊 Transactions Collection');
        const transactions = db.collection('transactions');
        await createIndexSafely(transactions, { userId: 1, date: -1 }, { name: 'user_date' });
        await createIndexSafely(transactions, { userId: 1, category: 1, date: -1 }, { name: 'user_category_date' });
        await createIndexSafely(transactions, { userId: 1, type: 1, date: -1 }, { name: 'user_type_date' });
        await createIndexSafely(transactions, { date: -1 }, { name: 'date' });

        // ==================== CATEGORIES ====================
        console.log('\n📊 Categories Collection');
        const categories = db.collection('categories');
        await createIndexSafely(categories, { userId: 1, name: 1 }, { name: 'user_name' });
        await createIndexSafely(categories, { userId: 1, createdAt: -1 }, { name: 'user_created' });

        // ==================== BUDGETS ====================
        console.log('\n📊 Budgets Collection');
        const budgets = db.collection('budgets');
        await createIndexSafely(budgets, { userId: 1, category: 1, period: 1 }, { name: 'user_category_period' });
        await createIndexSafely(budgets, { userId: 1, isActive: 1, startDate: -1 }, { name: 'user_active_start' });

        // ==================== RECURRING TRANSACTIONS ====================
        console.log('\n📊 Recurring Transactions Collection');
        const recurring = db.collection('recurringtransactions');
        await createIndexSafely(recurring, { userId: 1, isActive: 1, nextOccurrence: 1 }, { name: 'user_active_next' });
        await createIndexSafely(recurring, { userId: 1, frequency: 1 }, { name: 'user_frequency' });

        // ==================== NOTIFICATIONS ====================
        console.log('\n📊 Notifications Collection');
        const notifications = db.collection('notifications');
        await createIndexSafely(notifications, { userId: 1, isRead: 1, createdAt: -1 }, { name: 'user_read_created' });
        await createIndexSafely(notifications, { userId: 1, type: 1, createdAt: -1 }, { name: 'user_type_created' });

        // ==================== GOALS ====================
        console.log('\n📊 Goals Collection');
        const goals = db.collection('goals');
        await createIndexSafely(goals, { userId: 1, status: 1, createdAt: -1 }, { name: 'user_status_created' });
        await createIndexSafely(goals, { userId: 1, deadline: 1 }, { name: 'user_deadline' });

        // ==================== USER SETTINGS ====================
        console.log('\n📊 User Settings Collection');
        const settings = db.collection('usersettings');
        await createIndexSafely(settings, { userId: 1 }, { unique: true, name: 'user_unique' });

        // ==================== REPORTS ====================
        console.log('\n📊 Reports Collection');
        const reports = db.collection('reports');
        await createIndexSafely(reports, { userId: 1, type: 1, generatedAt: -1 }, { name: 'user_type_generated' });
        await createIndexSafely(reports, { userId: 1, 'period.startDate': 1, 'period.endDate': 1 }, { name: 'user_period' });

        // ==================== VERIFICATION ====================
        console.log('\n🔍 Verifying Indexes...\n');

        const collections = [
            { name: 'users', ref: users },
            { name: 'transactions', ref: transactions },
            { name: 'categories', ref: categories },
            { name: 'budgets', ref: budgets },
            { name: 'recurringtransactions', ref: recurring },
            { name: 'notifications', ref: notifications },
            { name: 'goals', ref: goals },
            { name: 'usersettings', ref: settings },
            { name: 'reports', ref: reports },
        ];

        let totalIndexes = 0;
        for (const col of collections) {
            const indexes = await col.ref.indexes();
            console.log(`  ${col.name}: ${indexes.length} indexes`);
            totalIndexes += indexes.length;
        }

        console.log('\n✅ Database initialization completed!');
        console.log(`📊 Total indexes created: ${totalIndexes}`);
        console.log('\n📝 Collections initialized:');
        console.log('   1. users - User accounts');
        console.log('   2. transactions - Financial transactions');
        console.log('   3. categories - Custom categories');
        console.log('   4. budgets - Spending limits');
        console.log('   5. recurringtransactions - Automated transactions');
        console.log('   6. notifications - User alerts');
        console.log('   7. goals - Savings goals');
        console.log('   8. usersettings - User preferences');
        console.log('   9. reports - Generated reports');

    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    } finally {
        await mongoose.connection.close();
        console.log('\n🔌 Disconnected from MongoDB');
        process.exit(0);
    }
}

initializeCompleteDatabase();
