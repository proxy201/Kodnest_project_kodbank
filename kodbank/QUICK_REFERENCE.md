# Kodbank - Quick Reference

## 🚀 Quick Start

### Local Development (3 Steps)

```bash
# Terminal 1 - Backend
cd backend
npm install
# Update .env with AIVEN credentials
node setup-db.js
npm run dev

# Terminal 2 - Frontend
cd frontend
npm install
npm start
```

Visit: `http://localhost:3000`

---

## 📡 API Endpoints

### Health Check
```
GET /health
Response: { "success": true, "message": "Server is running" }
```

### Authentication

#### Register User
```
POST /api/auth/register
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "secure_password",
  "phone": "9876543210"
}

Response (201):
{
  "success": true,
  "message": "User registered successfully. Please login."
}
```

#### Login
```
POST /api/auth/login
Content-Type: application/json

{
  "username": "john_doe",
  "password": "secure_password"
}

Response (200):
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

### Bank Operations

#### Check Balance (Protected)
```
GET /api/bank/check-balance
Authorization: Bearer <token>
Cookie: token=<token>

Response (200):
{
  "success": true,
  "message": "Balance fetched successfully",
  "balance": 100000,
  "username": "john_doe"
}
```

---

## 📂 Project Structure

```
kodbank/
│
├── backend/
│   ├── routes/
│   │   ├── auth.js          # Register, Login endpoints
│   │   └── balance.js       # Check Balance endpoint
│   │
│   ├── middleware/
│   │   └── verifyToken.js   # JWT verification middleware
│   │
│   ├── db.js                # MySQL connection pool
│   ├── server.js            # Express app setup
│   ├── setup-db.js          # Database initialization
│   ├── package.json         # Dependencies
│   ├── .env                 # Environment variables
│   ├── .gitignore
│   └── README.md
│
├── frontend/
│   ├── public/
│   │   └── index.html
│   │
│   ├── src/
│   │   ├── components/
│   │   │   ├── Home.js              # Landing page
│   │   │   ├── Register.js          # Registration form
│   │   │   ├── Login.js             # Login form
│   │   │   └── Dashboard.js         # User dashboard
│   │   │
│   │   ├── services/
│   │   │   └── api.js               # API client
│   │   │
│   │   ├── styles/
│   │   │   ├── Auth.css             # Auth pages styles
│   │   │   ├── Dashboard.css        # Dashboard styles
│   │   │   ├── Home.css             # Home page styles
│   │   │   └── App.css              # Global styles
│   │   │
│   │   ├── App.js                   # Main component
│   │   ├── index.js                 # React entry point
│   │   └── index.css
│   │
│   ├── package.json
│   ├── .env.local
│   ├── .gitignore
│   └── README.md
│
├── SETUP_GUIDE.md           # Complete setup guide
├── README.md                # Project overview
├── vercel.json              # Vercel deployment config
└── .gitignore
```

---

## 🗄️ Database Schema

### KodUser Table
```
uid          VARCHAR(36)     PRIMARY KEY
username     VARCHAR(255)    UNIQUE NOT NULL
email        VARCHAR(255)    UNIQUE NOT NULL
password     VARCHAR(255)    NOT NULL
phone        VARCHAR(20)     NOT NULL
balance      DECIMAL(15,2)   DEFAULT 100000
role         ENUM(...)       DEFAULT 'Customer'
created_at   TIMESTAMP       AUTO
updated_at   TIMESTAMP       AUTO
```

### UserToken Table
```
tid          VARCHAR(36)     PRIMARY KEY
token        LONGTEXT        NOT NULL
uid          VARCHAR(36)     FK KodUser(uid)
expiry       DATETIME        NOT NULL
created_at   TIMESTAMP       AUTO
```

---

## 🔑 Key Features

✅ User Registration with email & phone validation
✅ Secure password hashing (bcryptjs)
✅ JWT authentication with 24-hour expiry
✅ Role-based access (Customer default)
✅ Initial balance of ₹100,000
✅ Secure balance checking with token verification
✅ Beautiful UI with confetti animations
✅ Responsive design (mobile-friendly)
✅ CORS protection
✅ HTTP-only secure cookies

---

## 🔐 Security Features

| Feature | Implementation |
|---------|-----------------|
| Password Hashing | bcryptjs (salt rounds: 10) |
| JWT Signing | HS256 algorithm |
| Token Storage | Database + HTTP-only cookie |
| Token Expiry | 24 hours |
| CORS | Restricted to frontend URL |
| Secure Flag | Set in production |
| HttpOnly | Set on token cookie |
| Input Validation | Server-side validation |

---

## 📝 Environment Variables

### Backend (.env)
```
PORT=5000
DB_HOST=aiven-mysql-host
DB_USER=avnadmin
DB_PASSWORD=secret
DB_NAME=kodbank
JWT_SECRET=super-secret-key
JWT_EXPIRE=24h
CORS_ORIGIN=http://localhost:3000
NODE_ENV=development
```

### Frontend (.env.local)
```
REACT_APP_API_URL=http://localhost:5000/api
```

---

## 🎨 UI Routes

```
/ (Home)              - Landing page with features
/register             - User registration form
/login                - User login form
/dashboard            - User dashboard (protected)
```

---

## 📦 Dependencies

### Backend
- express: Web framework
- mysql2: MySQL client
- jsonwebtoken: JWT signing
- bcryptjs: Password hashing
- cors: CORS middleware
- cookie-parser: Cookie handling
- dotenv: Environment variables
- uuid: Unique ID generation

### Frontend
- react: UI framework
- react-router-dom: Client routing
- axios: HTTP client
- confetti-react: Celebration animations

---

## 🧪 Testing Checklist

- [ ] User registration works
- [ ] Username validation (unique)
- [ ] Email validation (unique)
- [ ] Password hashing verified
- [ ] Initial balance set to 100000
- [ ] Login with correct credentials
- [ ] Login fails with wrong password
- [ ] JWT token generated
- [ ] Token stored in database
- [ ] Token set as cookie
- [ ] Dashboard loads when logged in
- [ ] Check balance shows correct amount
- [ ] Confetti animation triggers
- [ ] Balance calculation is correct
- [ ] Logout clears token
- [ ] Protected routes redirect to login

---

## 🚀 Deployment Checklist

- [ ] Update environment variables
- [ ] Change JWT_SECRET to strong value
- [ ] Set NODE_ENV=production
- [ ] Update REACT_APP_API_URL
- [ ] Update CORS_ORIGIN
- [ ] Database backups configured
- [ ] API rate limiting added (optional)
- [ ] Logging configured
- [ ] Monitor error tracking
- [ ] SSL certificates valid
- [ ] Firewall rules updated
- [ ] AIVEN IP whitelist configured

---

## 💡 Tips & Tricks

1. **Reset Database:**
   ```bash
   # Delete tables and recreate
   node setup-db.js
   ```

2. **View Tokens:**
   - Open DevTools → Application → Cookies → token

3. **Test API Offline:**
   - Use Postman or Insomnia
   - Copy token from login response

4. **Debug JWT:**
   - Visit [jwt.io](https://jwt.io)
   - Paste token to see payload

5. **Monitor Database:**
   - Use MySQL Workbench
   - Or AIVEN console

---

## 🔗 Useful Links

- [JWT.io](https://jwt.io) - JWT debugger
- [AIVEN Console](https://console.aiven.io) - Database management
- [Vercel Dashboard](https://vercel.com/dashboard) - Deployment
- [Node.js Docs](https://nodejs.org/docs) - Node documentation
- [React Docs](https://react.dev) - React documentation

---

## 📞 Common Commands

```bash
# Start backend
cd backend && npm run dev

# Start frontend
cd frontend && npm start

# Build frontend
cd frontend && npm run build

# Database setup
cd backend && node setup-db.js

# Kill port (Windows)
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

---

**Last Updated:** February 19, 2026
**Version:** 1.0.0
**Status:** Production Ready ✅
