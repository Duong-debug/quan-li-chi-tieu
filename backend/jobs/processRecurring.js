const RecurringTransaction = require('../models/RecurringTransaction');
const Transaction = require('../models/Transaction');

// Calculate next occurrence based on frequency
function calculateNextOccurrence(current, frequency, dayOfMonth, dayOfWeek) {
    const next = new Date(current);

    switch (frequency) {
        case 'daily':
            next.setDate(next.getDate() + 1);
            break;

        case 'weekly':
            next.setDate(next.getDate() + 7);
            break;

        case 'monthly':
            next.setMonth(next.getMonth() + 1);
            // Handle day of month (e.g., if dayOfMonth is 31 but next month has 30 days)
            if (dayOfMonth) {
                const daysInMonth = new Date(next.getFullYear(), next.getMonth() + 1, 0).getDate();
                next.setDate(Math.min(dayOfMonth, daysInMonth));
            }
            break;

        case 'yearly':
            next.setFullYear(next.getFullYear() + 1);
            break;
    }

    return next;
}

// Process all due recurring transactions
async function processRecurringTransactions() {
    try {
        console.log('🔄 Processing recurring transactions...');
        const now = new Date();
        now.setHours(0, 0, 0, 0); // Start of today

        // Find all active recurring transactions that are due
        const dueRecurring = await RecurringTransaction.find({
            isActive: true,
            nextOccurrence: { $lte: now },
            $or: [
                { endDate: { $exists: false } },
                { endDate: { $gte: now } }
            ]
        });

        console.log(`Found ${dueRecurring.length} due recurring transactions`);

        let created = 0;
        let errors = 0;

        for (const recurring of dueRecurring) {
            try {
                // Create the transaction
                const transaction = new Transaction({
                    userId: recurring.userId,
                    title: recurring.title,
                    category: recurring.category,
                    amount: recurring.amount,
                    type: recurring.type,
                    date: recurring.nextOccurrence,
                    note: recurring.note ? `${recurring.note} (Auto-generated)` : 'Auto-generated from recurring transaction'
                });

                await transaction.save();
                created++;

                // Update next occurrence
                const nextOccurrence = calculateNextOccurrence(
                    recurring.nextOccurrence,
                    recurring.frequency,
                    recurring.dayOfMonth,
                    recurring.dayOfWeek
                );

                recurring.nextOccurrence = nextOccurrence;
                recurring.lastProcessed = now;
                await recurring.save();

                console.log(`✓ Created transaction for: ${recurring.title}`);
            } catch (error) {
                console.error(`✗ Error processing recurring transaction ${recurring._id}:`, error);
                errors++;
            }
        }

        console.log(`✅ Processed ${created} transactions, ${errors} errors`);
        return { created, errors };
    } catch (error) {
        console.error('❌ Error in processRecurringTransactions:', error);
        throw error;
    }
}

module.exports = { processRecurringTransactions, calculateNextOccurrence };
