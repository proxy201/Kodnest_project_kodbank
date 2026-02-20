# Kodbank - Complete Setup & Deployment Guide

## 📋 Table of Contents
1. [Local Development Setup](#local-development-setup)
2. [Database Configuration (AIVEN)](#database-configuration-aiven)
3. [Backend Setup](#backend-setup)
4. [Frontend Setup](#frontend-setup)
5. [Vercel Deployment](#vercel-deployment)
6. [Testing the Application](#testing-the-application)

---

## 🖥️ Local Development Setup

### Prerequisites
- Node.js v14+ ([Download](https://nodejs.org/))
- npm (comes with Node.js)
- Git
- MySQL Workbench or command line client (optional)

### Step 1: Clone/Download Project
```bash
cd kodbank
```

---

## 🗄️ Database Configuration (AIVEN)

### Get AIVEN Credentials
1. Sign up at [AIVEN](https://aiven.io)
2. Create a MySQL service
3. Note these details:
   - **Service URI hostname** (DB_HOST)
   - **Username** (DB_USER)
   - **Password** (DB_PASSWORD)
   - **Database name** (DB_NAME) - will create as "kodbank"

### Whitelist Your IP
1. In AIVEN console, go to your MySQL service
2. Click "Details"
3. Add your IP to "Access Control"
4. Or use 0.0.0.0/0 for development (not recommended for production)

---

## 🔧 Backend Setup

### Step 1: Install Dependencies
```bash
cd backend
npm install
```

### Step 2: Create .env File
Create `backend/.env`:
```env
# Database Configuration (from AIVEN)
DB_HOST=your-aiven-mysql-hostname
DB_USER=avnadmin
DB_PASSWORD=your-password
DB_NAME=kodbank

# Server Configuration
PORT=5000
NODE_ENV=development

# JWT Configuration
JWT_SECRET=kodbank-super-secret-key-change-this-in-production-12345
JWT_EXPIRE=24h

# CORS Configuration
CORS_ORIGIN=http://localhost:3000
```

### Step 3: Initialize Database
```bash
node setup-db.js
```

**Expected Output:**
```
✅ Database created or already exists
✅ KodUser table created or already exists
✅ UserToken table created or already exists
✅ Database setup completed successfully!
```

### Step 4: Start Backend Server
```bash
npm run dev
```

**Expected Output:**
```
✅ Kodbank Backend Server running on port 5000
Environment: development
```

### Troubleshooting Backend

**Connection Error:**
- Verify AIVEN credentials are correct
- Check IP is whitelisted in AIVEN
- Ensure MySQL service is running

**Port Already in Use:**
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -i :5000
kill -9 <PID>
```

---

## ⚛️ Frontend Setup

### Step 1: Install Dependencies
```bash
cd frontend
npm install
```

### Step 2: Create .env.local File
Create `frontend/.env.local`:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

### Step 3: Start Development Server
```bash
npm start
```

**Expected Output:**
```
Compiled successfully!

You can now view kodbank-frontend in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.**.*:3000
```

Browser will open automatically at `http://localhost:3000`

---

## 🌐 Testing the Application

### 1. Home Page
- Navigate to `http://localhost:3000`
- Should see welcome screen with features

### 2. Registration Flow
- Click "Create Account"
- Fill form:
  - Username: `testuser`
  - Email: `test@example.com`
  - Password: `Test@123456`
  - Phone: `9876543210`
- Click "Create Account"
- Should redirect to login with success message

### 3. Login Flow
- Enter credentials from registration
- Click "Login"
- Should redirect to dashboard
- Check browser console tab "Application" → "Cookies" for "token"

### 4. Check Balance
- On dashboard, click "💰 Check Balance"
- Should display: "Your balance is: ₹100,000.00"
- Confetti animation should appear

### 5. API Testing with CURL

**Register User:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john_doe",
    "email": "john@example.com",
    "password": "John@123",
    "phone": "9876543210"
  }'
```

**Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -c cookies.txt \
  -d '{
    "username": "john_doe",
    "password": "John@123"
  }'
```

**Check Balance:**
```bash
curl -X GET http://localhost:5000/api/bank/check-balance \
  -H "Authorization: Bearer <token_from_login>" \
  -b cookies.txt
```

---

## 🚀 Vercel Deployment

### Prerequisites
- GitHub account with repository
- Vercel account ([Sign up](https://vercel.com))
- AIVEN MySQL database

### Step 1: Prepare Repository

Create `.gitignore` in root:
```
node_modules/
.env
.env.local
build/
dist/
.DS_Store
```

Push to GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/kodbank.git
git push -u origin main
```

### Step 2: Setup Vercel Project

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Select your GitHub repository
4. Select "Other" as framework
5. Click "Deploy"

### Step 3: Configure Environment Variables

In Vercel Dashboard → Settings → Environment Variables, add:

```
DB_HOST=your-aiven-host
DB_USER=avnadmin
DB_PASSWORD=your-password
DB_NAME=kodbank
JWT_SECRET=change-this-to-a-very-long-random-string
JWT_EXPIRE=24h
CORS_ORIGIN=https://your-vercel-url.vercel.app
NODE_ENV=production
```

### Step 4: Update Frontend API URL

In `frontend/.env.production`:
```env
REACT_APP_API_URL=https://your-vercel-url.vercel.app/api
```

### Step 5: Redeploy

1. Push changes to GitHub
2. Vercel will auto-deploy
3. Access your app at `https://your-vercel-url.vercel.app`

### Step 6: Test Production

- Register new user
- Login
- Check balance
- Verify token in browser cookies

---

## 🔐 Security Checklist

- [ ] Change JWT_SECRET to a long random string
- [ ] Use HTTPS for all communications
- [ ] Enable AIVEN firewall rules
- [ ] Set NODE_ENV=production
- [ ] Enable httpOnly and secure flags on cookies
- [ ] Regular database backups
- [ ] Monitor AIVEN console for unusual activity

---

## 📊 Database Management

### View Tables in MySQL
```bash
mysql -h <DB_HOST> -u <DB_USER> -p<DB_PASSWORD> <DB_NAME>

# In MySQL prompt:
SHOW TABLES;
DESC KodUser;
DESC UserToken;
SELECT * FROM KodUser;
```

### Backup Database
```bash
mysqldump -h <DB_HOST> -u <DB_USER> -p<DB_PASSWORD> <DB_NAME> > backup.sql
```

### Restore Database
```bash
mysql -h <DB_HOST> -u <DB_USER> -p<DB_PASSWORD> <DB_NAME> < backup.sql
```

---

## 🆘 Common Issues & Solutions

### Issue: CORS Error
**Solution:**
- Update CORS_ORIGIN in backend .env
- Restart backend server

### Issue: JWT Token Invalid
**Solution:**
- Ensure JWT_SECRET is same in all environments
- Check token expiry
- Clear browser cookies and re-login

### Issue: Database Connection Failed
**Solution:**
- Verify AIVEN hostname format
- Check username/password
- Ensure IP is whitelisted
- Test connection with MySQL client

### Issue: 404 on API Endpoints
**Solution:**
- Verify backend server is running
- Check API_URL in frontend .env
- Verify endpoint paths in API service

### Issue: Balance not Showing
**Solution:**
- Verify JWT token is valid
- Check user exists in KodUser table
- Verify token is sent in headers

---

## 📞 Support & Help

For issues:
1. Check error messages in console
2. Review server logs
3. Verify environment variables
4. Check database connection
5. Test API with CURL
6. Check browser DevTools Network tab

---

## 📚 Useful Commands

```bash
# Backend
cd backend
npm install              # Install dependencies
npm run dev             # Start dev server with auto-reload
npm start               # Start production server
node setup-db.js        # Initialize database

# Frontend
cd frontend
npm install              # Install dependencies
npm start               # Start dev server
npm run build           # Build for production

# Database
mysql -h <host> -u <user> -p    # Connect to MySQL

# Git
git status
git add .
git commit -m "message"
git push origin main
```

---

## ✨ Next Steps After Deployment

1. **Monitor:** Watch Vercel logs for errors
2. **Test:** Thoroughly test all features
3. **Secure:** Implement additional security measures
4. **Scale:** Add more features as needed
5. **Backup:** Regular database backups
6. **Update:** Keep dependencies updated

---

**Congratulations! Your Kodbank app is ready! 🎉**
