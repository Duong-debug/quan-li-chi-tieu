# MongoDB Database Schema - Expense Management Application (Complete)

## Overview
This document describes the complete MongoDB database schema for the Expense Management Application. The database consists of **9 collections** covering all aspects of personal finance management.

---

## Collections Summary

| Collection | Purpose | Key Features |
|------------|---------|--------------|
| **users** | User accounts & authentication | Login, roles, password hashing |
| **transactions** | Financial transactions | Expenses, income, categorization |
| **categories** | Custom expense categories | User-defined categories with colors |
| **budgets** | Spending limits | Category budgets with alerts |
| **recurringtransactions** | Automated transactions | Recurring bills, subscriptions |
| **notifications** | User alerts | Budget alerts, reminders |
| **goals** | Savings goals | Financial targets, progress tracking |
| **usersettings** | User preferences | Theme, language, notifications |
| **reports** | Generated reports | Financial summaries, insights |

---

## Detailed Schema

### 1. **users** Collection

User accounts and authentication.

#### Fields

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `_id` | ObjectId | Yes | Auto | Primary key |
| `fullName` | String | Yes | - | User's full name |
| `email` | String | Yes | - | Email (unique, lowercase) |
| `password` | String | Yes | - | Hashed password (bcrypt) |
| `role` | String | No | 'user' | 'user' or 'admin' |
| `createdAt` | Date | No | Date.now | Account creation |

#### Indexes
```javascript
{ email: 1 } // unique
{ role: 1, createdAt: -1 }
```

---

### 2. **transactions** Collection

All financial transactions (expenses/income).

#### Fields

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `_id` | ObjectId | Yes | Auto | Primary key |
| `userId` | ObjectId | Yes | - | Ref: users._id |
| `title` | String | Yes | - | Transaction description |
| `date` | Date | Yes | - | Transaction date |
| `category` | String | Yes | - | Category name |
| `amount` | Number | Yes | - | Amount (positive) |
| `type` | String | No | 'expense' | 'expense' or 'income' |
| `note` | String | No | - | Additional notes |
| `createdAt` | Date | No | Date.now | Record creation |

#### Indexes
```javascript
{ userId: 1, date: -1 }
{ userId: 1, category: 1, date: -1 }
{ userId: 1, type: 1, date: -1 }
{ date: -1 }
```

---

### 3. **categories** Collection

Custom user-defined categories.

#### Fields

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `_id` | ObjectId | Yes | Auto | Primary key |
| `userId` | ObjectId | Yes | - | Ref: users._id |
| `name` | String | Yes | - | Category name |
| `color` | String | No | '#3b82f6' | Hex color code |
| `icon` | String | No | - | Icon identifier |
| `createdAt` | Date | No | Date.now | Record creation |

#### Indexes
```javascript
{ userId: 1, name: 1 }
{ userId: 1, createdAt: -1 }
```

---

### 4. **budgets** Collection ✨ NEW

Spending limits per category with alerts.

#### Fields

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `_id` | ObjectId | Yes | Auto | Primary key |
| `userId` | ObjectId | Yes | - | Ref: users._id |
| `category` | String | Yes | - | Category name |
| `amount` | Number | Yes | - | Budget limit |
| `period` | String | No | 'monthly' | 'daily', 'weekly', 'monthly', 'yearly' |
| `startDate` | Date | Yes | - | Budget start date |
| `endDate` | Date | No | - | Budget end date |
| `alertThreshold` | Number | No | 80 | Alert at % (0-100) |
| `isActive` | Boolean | No | true | Budget active status |
| `createdAt` | Date | No | Date.now | Record creation |
| `updatedAt` | Date | No | Date.now | Last update |

#### Indexes
```javascript
{ userId: 1, category: 1, period: 1 }
{ userId: 1, isActive: 1, startDate: -1 }
```

---

### 5. **recurringtransactions** Collection ✨ NEW

Automated recurring transactions (bills, subscriptions).

#### Fields

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `_id` | ObjectId | Yes | Auto | Primary key |
| `userId` | ObjectId | Yes | - | Ref: users._id |
| `title` | String | Yes | - | Transaction title |
| `category` | String | Yes | - | Category name |
| `amount` | Number | Yes | - | Transaction amount |
| `type` | String | No | 'expense' | 'expense' or 'income' |
| `frequency` | String | Yes | - | 'daily', 'weekly', 'monthly', 'yearly' |
| `startDate` | Date | Yes | - | First occurrence |
| `endDate` | Date | No | - | Last occurrence |
| `nextOccurrence` | Date | Yes | - | Next scheduled date |
| `dayOfMonth` | Number | No | - | Day (1-31) for monthly |
| `dayOfWeek` | Number | No | - | Day (0-6) for weekly |
| `note` | String | No | - | Additional notes |
| `isActive` | Boolean | No | true | Active status |
| `lastProcessed` | Date | No | - | Last execution |
| `createdAt` | Date | No | Date.now | Record creation |
| `updatedAt` | Date | No | Date.now | Last update |

#### Indexes
```javascript
{ userId: 1, isActive: 1, nextOccurrence: 1 }
{ userId: 1, frequency: 1 }
```

---

### 6. **notifications** Collection ✨ NEW

User notifications and alerts.

#### Fields

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `_id` | ObjectId | Yes | Auto | Primary key |
| `userId` | ObjectId | Yes | - | Ref: users._id |
| `type` | String | Yes | - | 'budget_alert', 'recurring_transaction', 'goal_achieved', 'system', 'reminder' |
| `title` | String | Yes | - | Notification title |
| `message` | String | Yes | - | Notification message |
| `relatedId` | ObjectId | No | - | Related document ID |
| `relatedModel` | String | No | - | Related model name |
| `isRead` | Boolean | No | false | Read status |
| `priority` | String | No | 'medium' | 'low', 'medium', 'high' |
| `createdAt` | Date | No | Date.now | Creation time |

#### Indexes
```javascript
{ userId: 1, isRead: 1, createdAt: -1 }
{ userId: 1, type: 1, createdAt: -1 }
```

---

### 7. **goals** Collection ✨ NEW

Savings goals and financial targets.

#### Fields

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `_id` | ObjectId | Yes | Auto | Primary key |
| `userId` | ObjectId | Yes | - | Ref: users._id |
| `name` | String | Yes | - | Goal name |
| `description` | String | No | - | Goal description |
| `targetAmount` | Number | Yes | - | Target amount |
| `currentAmount` | Number | No | 0 | Current saved amount |
| `deadline` | Date | No | - | Target deadline |
| `category` | String | No | - | Related category |
| `priority` | String | No | 'medium' | 'low', 'medium', 'high' |
| `status` | String | No | 'active' | 'active', 'completed', 'cancelled' |
| `icon` | String | No | - | Icon identifier |
| `color` | String | No | '#3b82f6' | Hex color code |
| `createdAt` | Date | No | Date.now | Record creation |
| `updatedAt` | Date | No | Date.now | Last update |
| `completedAt` | Date | No | - | Completion date |

#### Indexes
```javascript
{ userId: 1, status: 1, createdAt: -1 }
{ userId: 1, deadline: 1 }
```

---

### 8. **usersettings** Collection ✨ NEW

User preferences and configuration.

#### Fields

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `_id` | ObjectId | Yes | Auto | Primary key |
| `userId` | ObjectId | Yes | - | Ref: users._id (unique) |
| `currency` | String | No | 'VND' | Currency code |
| `language` | String | No | 'vi' | 'vi' or 'en' |
| `theme` | String | No | 'system' | 'light', 'dark', 'system' |
| `dateFormat` | String | No | 'DD/MM/YYYY' | Date format preference |
| `emailNotifications` | Object | No | {...} | Email notification settings |
| `pushNotifications` | Object | No | {...} | Push notification settings |
| `defaultBudgetPeriod` | String | No | 'monthly' | Default budget period |
| `budgetAlertThreshold` | Number | No | 80 | Default alert threshold |
| `twoFactorEnabled` | Boolean | No | false | 2FA status |
| `sessionTimeout` | Number | No | 30 | Session timeout (minutes) |
| `autoBackup` | Boolean | No | false | Auto backup enabled |
| `backupFrequency` | String | No | 'weekly' | Backup frequency |
| `createdAt` | Date | No | Date.now | Record creation |
| `updatedAt` | Date | No | Date.now | Last update |

#### Indexes
```javascript
{ userId: 1 } // unique
```

---

### 9. **reports** Collection ✨ NEW

Generated financial reports and insights.

#### Fields

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `_id` | ObjectId | Yes | Auto | Primary key |
| `userId` | ObjectId | Yes | - | Ref: users._id |
| `type` | String | Yes | - | 'daily', 'weekly', 'monthly', 'yearly', 'custom' |
| `period.startDate` | Date | Yes | - | Report start date |
| `period.endDate` | Date | Yes | - | Report end date |
| `summary.totalIncome` | Number | No | 0 | Total income |
| `summary.totalExpense` | Number | No | 0 | Total expense |
| `summary.balance` | Number | No | 0 | Net balance |
| `summary.transactionCount` | Number | No | 0 | Transaction count |
| `categoryBreakdown` | Array | No | [] | Spending by category |
| `topExpenses` | Array | No | [] | Largest expenses |
| `insights` | Array | No | [] | AI-generated insights |
| `generatedAt` | Date | No | Date.now | Report generation time |

#### Indexes
```javascript
{ userId: 1, type: 1, generatedAt: -1 }
{ userId: 1, 'period.startDate': 1, 'period.endDate': 1 }
```

---

## Relationships Diagram

```
                    ┌─────────────────┐
                    │     users       │
                    │  _id (PK)       │
                    └────────┬────────┘
                             │
                             │ 1:N
                             │
        ┌────────────────────┼────────────────────┐
        │                    │                    │
        │                    │                    │
┌───────▼────────┐  ┌────────▼────────┐  ┌───────▼────────┐
│ transactions   │  │   categories    │  │    budgets     │
│  userId (FK)   │  │   userId (FK)   │  │   userId (FK)  │
└────────────────┘  └─────────────────┘  └────────────────┘
        │                    │                    │
        │                    │                    │
┌───────▼────────┐  ┌────────▼────────┐  ┌───────▼────────┐
│recurring       │  │ notifications   │  │     goals      │
│transactions    │  │   userId (FK)   │  │   userId (FK)  │
│  userId (FK)   │  └─────────────────┘  └────────────────┘
└────────────────┘           │                    │
        │                    │                    │
┌───────▼────────┐  ┌────────▼────────┐          │
│ usersettings   │  │    reports      │          │
│  userId (FK)   │  │   userId (FK)   │          │
│  (unique)      │  └─────────────────┘          │
└────────────────┘                                │
```

---

## Database Initialization

Run this script to create all indexes:

```bash
cd backend
npm run init-db-complete
```

Or manually in MongoDB shell:

```javascript
// Users
db.users.createIndex({ email: 1 }, { unique: true });
db.users.createIndex({ role: 1, createdAt: -1 });

// Transactions
db.transactions.createIndex({ userId: 1, date: -1 });
db.transactions.createIndex({ userId: 1, category: 1, date: -1 });
db.transactions.createIndex({ userId: 1, type: 1, date: -1 });
db.transactions.createIndex({ date: -1 });

// Categories
db.categories.createIndex({ userId: 1, name: 1 });
db.categories.createIndex({ userId: 1, createdAt: -1 });

// Budgets
db.budgets.createIndex({ userId: 1, category: 1, period: 1 });
db.budgets.createIndex({ userId: 1, isActive: 1, startDate: -1 });

// Recurring Transactions
db.recurringtransactions.createIndex({ userId: 1, isActive: 1, nextOccurrence: 1 });
db.recurringtransactions.createIndex({ userId: 1, frequency: 1 });

// Notifications
db.notifications.createIndex({ userId: 1, isRead: 1, createdAt: -1 });
db.notifications.createIndex({ userId: 1, type: 1, createdAt: -1 });

// Goals
db.goals.createIndex({ userId: 1, status: 1, createdAt: -1 });
db.goals.createIndex({ userId: 1, deadline: 1 });

// User Settings
db.usersettings.createIndex({ userId: 1 }, { unique: true });

// Reports
db.reports.createIndex({ userId: 1, type: 1, generatedAt: -1 });
db.reports.createIndex({ userId: 1, 'period.startDate': 1, 'period.endDate': 1 });
```

---

## Key Features

### Data Integrity
- All foreign keys reference `users._id`
- Cascade deletes handled at application level
- Unique constraints on email and userSettings

### Performance
- Compound indexes for common query patterns
- Optimized for user-specific queries
- Date-based sorting pre-indexed

### Security
- Password hashing with bcrypt
- User data isolation
- Session management
- Optional 2FA support

### Scalability
- Sharding by `userId` recommended
- Time-series optimization for transactions
- Archiving strategy for old data
