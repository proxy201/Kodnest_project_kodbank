# Kodbank - Digital Banking Application

A complete full-stack banking application built with Node.js, React, and MySQL featuring JWT-based authentication and Confetti animations.

## 🚀 Features

- **User Registration**: Create new accounts with initial balance of ₹100,000
- **Secure Login**: JWT-based authentication with role-based access
- **Check Balance**: View account balance with celebration animations
- **Responsive Design**: Mobile-friendly UI with beautiful gradients and animations

## 📋 Prerequisites

- Node.js (v14 or higher)
- MySQL Database (AIVEN or local)
- npm or yarn

## 🛠️ Installation & Setup

### 1. Database Setup (AIVEN MySQL)

Update `.env` file in backend with your AIVEN credentials:
```env
DB_HOST=your-aiven-host
DB_USER=your-aiven-user
DB_PASSWORD=your-aiven-password
DB_NAME=kodbank
```

Run database initialization:
```bash
cd backend
npm install
node setup-db.js
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Update backend `.env`:
```env
PORT=5000
DB_HOST=your-aiven-host
DB_USER=your-aiven-user
DB_PASSWORD=your-aiven-password
DB_NAME=kodbank
JWT_SECRET=your-super-secret-key
JWT_EXPIRE=24h
CORS_ORIGIN=http://localhost:3000
NODE_ENV=development
```

Start backend:
```bash
npm run dev    # Development with nodemon
npm start      # Production
```

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Update frontend `.env.local`:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

Start frontend:
```bash
npm start      # Runs on http://localhost:3000
npm run build  # Production build
```

## 📱 Application Flow

### Registration
1. User navigates to `/register`
2. Enters: username, email, password, phone
3. Account created with ₹100,000 initial balance
4. Redirected to login page

### Login
1. User enters username and password
2. Backend validates credentials
3. JWT token generated and stored in database
4. Token sent as cookie
5. User redirected to dashboard

### Dashboard
1. Displays welcome message with username
2. "Check Balance" button
3. On click, JWT token sent to backend
4. Backend verifies token and fetches balance
5. Balance displayed with confetti celebration animation

## 🏗️ Project Structure

```
kodbank/
├── backend/
│   ├── routes/
│   │   ├── auth.js          # Registration & Login endpoints
│   │   └── balance.js       # Balance check endpoint
│   ├── middleware/
│   │   └── verifyToken.js   # JWT verification middleware
│   ├── db.js                # Database connection
│   ├── server.js            # Express server
│   ├── setup-db.js          # Database initialization
│   ├── package.json
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Home.js
│   │   │   ├── Register.js
│   │   │   ├── Login.js
│   │   │   └── Dashboard.js
│   │   ├── services/
│   │   │   └── api.js       # API client
│   │   ├── styles/
│   │   │   ├── Auth.css
│   │   │   ├── Dashboard.css
│   │   │   └── Home.css
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   ├── public/
│   │   └── index.html
│   ├── package.json
│   └── .env.local
└── vercel.json
```

## 📊 Database Schema

### KodUser Table
```sql
CREATE TABLE KodUser (
  uid VARCHAR(36) PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  balance DECIMAL(15, 2) DEFAULT 100000,
  role ENUM('Customer', 'Manager', 'Admin') DEFAULT 'Customer',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### UserToken Table
```sql
CREATE TABLE UserToken (
  tid VARCHAR(36) PRIMARY KEY,
  token LONGTEXT NOT NULL,
  uid VARCHAR(36) NOT NULL,
  expiry DATETIME NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (uid) REFERENCES KodUser(uid) ON DELETE CASCADE
);
```

## 🔐 Security Features

- Password hashing using bcryptjs
- JWT token-based authentication
- Token expiry (24 hours)
- HTTP-only cookies
- CORS protection
- Input validation

## 🚀 Deployment on Vercel

### Prerequisites
- Vercel account
- GitHub repository

### Steps
1. Push code to GitHub
2. Import project in Vercel dashboard
3. Set environment variables in Vercel:
   - `DB_HOST`
   - `DB_USER`
   - `DB_PASSWORD`
   - `DB_NAME`
   - `JWT_SECRET`
4. Deploy

Update `REACT_APP_API_URL` to your Vercel API endpoint in production.

## 🎨 UI Features

- Glassmorphism design
- Gradient backgrounds
- Smooth animations
- Confetti celebration on balance check
- Responsive mobile design
- Form validation feedback

## 📝 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Banking
- `GET /api/bank/check-balance` - Check balance (requires JWT token)

### Health
- `GET /health` - Server health check

## 🛡️ Error Handling

All endpoints return structured JSON responses:
```json
{
  "success": true/false,
  "message": "Success or error message",
  "data": {}
}
```

## 📜 License

This project is open source and available under the MIT License.

## 👨‍💻 Support

For issues and questions, please create an issue in the repository.

---

**Happy Banking! 🏦💰**
