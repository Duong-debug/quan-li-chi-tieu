# Personal Expense Manager API

A comprehensive REST API for managing personal expenses with AI features.

## Installation

1. Install dependencies:
\`\`\`bash
npm install
\`\`\`

2. Create `.env` file (copy from `.env.example`):
\`\`\`bash
cp .env.example .env
\`\`\`

3. Update environment variables with your MongoDB URI and JWT secret

4. Start the server:
\`\`\`bash
# Development
npm run dev

# Production
npm start
\`\`\`

## API Endpoints

### Authentication
- **POST** `/auth/register` - Register new user
- **POST** `/auth/login` - Login user

### Transactions
- **GET** `/transactions` - Get all transactions (requires auth)
- **GET** `/transactions/:id` - Get specific transaction
- **POST** `/transactions` - Create transaction
- **PUT** `/transactions/:id` - Update transaction
- **DELETE** `/transactions/:id` - Delete transaction

### AI Features
- **POST** `/ai/classify` - Auto-classify transaction
- **POST** `/ai/predict` - Predict future expenses
- **GET** `/ai/suggest` - Get saving suggestions

## Folder Structure

\`\`\`
backend/
├── config/
│   └── database.js
├── models/
│   ├── User.js
│   ├── Transaction.js
│   └── Category.js
├── routes/
│   ├── auth.js
│   ├── transactions.js
│   └── ai.js
├── .env.example
├── package.json
└── server.js
\`\`\`

## Environment Variables

- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT tokens
- `PORT`: Server port (default: 5000)
- `NODE_ENV`: Environment (development/production)
