# Kodbank Backend API

Core backend server for the Kodbank digital banking application.

## Quick Start

### Installation
```bash
npm install
```

### Environment Setup
Create `.env` file with:
```env
PORT=5000
DB_HOST=your-aiven-host
DB_USER=your-aiven-user
DB_PASSWORD=your-aiven-password
DB_NAME=kodbank
JWT_SECRET=kodbank-super-secret-key
JWT_EXPIRE=24h
CORS_ORIGIN=http://localhost:3000
NODE_ENV=development
```

### Database Initialization
```bash
node setup-db.js
```

### Development
```bash
npm run dev
```

### Production
```bash
npm start
```

## API Endpoints

### POST /api/auth/register
Register a new user.

**Request Body:**
```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "phone": "9876543210"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully. Please login."
}
```

### POST /api/auth/login
Login user and get JWT token.

**Request Body:**
```json
{
  "username": "john_doe",
  "password": "securePassword123"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGc...",
  "user": {
    "username": "john_doe",
    "email": "john@example.com",
    "role": "Customer"
  }
}
```

### GET /api/bank/check-balance
Check user balance (requires JWT token).

**Headers:**
```
Authorization: Bearer <token>
Cookie: token=<token>
```

**Response (200):**
```json
{
  "success": true,
  "message": "Balance fetched successfully",
  "balance": 100000,
  "username": "john_doe"
}
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| PORT | Server port (default: 5000) |
| DB_HOST | MySQL host |
| DB_USER | MySQL username |
| DB_PASSWORD | MySQL password |
| DB_NAME | Database name |
| JWT_SECRET | Secret key for JWT signing |
| JWT_EXPIRE | Token expiration time |
| CORS_ORIGIN | Frontend origin URL |
| NODE_ENV | production/development |

## Technologies

- Express.js
- MySQL2
- JWT
- bcryptjs
- CORS
- Cookie-parser

## Project Structure

```
backend/
├── routes/
│   ├── auth.js
│   └── balance.js
├── middleware/
│   └── verifyToken.js
├── db.js
├── server.js
├── setup-db.js
├── package.json
└── .env
```
