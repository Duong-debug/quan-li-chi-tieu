/**
 * MongoDB Database Initialization Script
 * This script creates all necessary indexes for the Expense Management Application
 * 
 * Usage: node scripts/init-db.js
 */

const mongoose = require('mongoose');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/expense-management';

async function initializeDatabase() {
    try {
        console.log('🔌 Connecting to MongoDB...');
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected to MongoDB successfully');

        const db = mongoose.connection.db;

        // Helper function to create index safely
        async function createIndexSafely(collection, indexSpec, options) {
            try {
                await collection.createIndex(indexSpec, options);
                console.log(`  ✓ Created index: ${options.name}`);
                return true;
            } catch (error) {
                if (error.code === 85 || error.code === 86) {
                    // Index already exists or has conflict
                    console.log(`  ℹ Index already exists: ${options.name}`);
                    return false;
                }
                throw error;
            }
        }

        // ==================== USERS COLLECTION ====================
        console.log('\n📊 Creating indexes for users collection...');

        const usersCollection = db.collection('users');

        // Unique index on email
        await createIndexSafely(
            usersCollection,
            { email: 1 },
            { unique: true, name: 'email_unique_idx' }
        );

        // Compound index for role-based queries
        await createIndexSafely(
            usersCollection,
            { role: 1, createdAt: -1 },
            { name: 'role_createdAt_idx' }
        );

        // ==================== TRANSACTIONS COLLECTION ====================
        console.log('\n📊 Creating indexes for transactions collection...');

        const transactionsCollection = db.collection('transactions');

        // Compound index for user-specific queries with date sorting
        await createIndexSafely(
            transactionsCollection,
            { userId: 1, date: -1 },
            { name: 'userId_date_idx' }
        );

        // Compound index for category-based analytics
        await createIndexSafely(
            transactionsCollection,
            { userId: 1, category: 1, date: -1 },
            { name: 'userId_category_date_idx' }
        );

        // Index for date range queries
        await createIndexSafely(
            transactionsCollection,
            { date: -1 },
            { name: 'date_idx' }
        );

        // Compound index for type-based filtering
        await createIndexSafely(
            transactionsCollection,
            { userId: 1, type: 1, date: -1 },
            { name: 'userId_type_date_idx' }
        );

        // ==================== CATEGORIES COLLECTION ====================
        console.log('\n📊 Creating indexes for categories collection...');

        const categoriesCollection = db.collection('categories');

        // Compound index for user-specific category queries
        await createIndexSafely(
            categoriesCollection,
            { userId: 1, name: 1 },
            { name: 'userId_name_idx' }
        );

        // Index for user's categories
        await createIndexSafely(
            categoriesCollection,
            { userId: 1, createdAt: -1 },
            { name: 'userId_createdAt_idx' }
        );

        // ==================== VERIFY INDEXES ====================
        console.log('\n🔍 Verifying indexes...');

        const usersIndexes = await usersCollection.indexes();
        console.log(`\n  Users collection indexes (${usersIndexes.length}):`);
        usersIndexes.forEach(idx => {
            console.log(`    - ${idx.name}: ${JSON.stringify(idx.key)}`);
        });

        const transactionsIndexes = await transactionsCollection.indexes();
        console.log(`\n  Transactions collection indexes (${transactionsIndexes.length}):`);
        transactionsIndexes.forEach(idx => {
            console.log(`    - ${idx.name}: ${JSON.stringify(idx.key)}`);
        });

        const categoriesIndexes = await categoriesCollection.indexes();
        console.log(`\n  Categories collection indexes (${categoriesIndexes.length}):`);
        categoriesIndexes.forEach(idx => {
            console.log(`    - ${idx.name}: ${JSON.stringify(idx.key)}`);
        });

        console.log('\n✅ Database initialization completed successfully!');
        console.log('\n📝 Summary:');
        console.log(`   - Users: ${usersIndexes.length} indexes`);
        console.log(`   - Transactions: ${transactionsIndexes.length} indexes`);
        console.log(`   - Categories: ${categoriesIndexes.length} indexes`);

    } catch (error) {
        console.error('❌ Error initializing database:', error);
        process.exit(1);
    } finally {
        await mongoose.connection.close();
        console.log('\n🔌 Disconnected from MongoDB');
        process.exit(0);
    }
}

// Run the initialization
initializeDatabase();
