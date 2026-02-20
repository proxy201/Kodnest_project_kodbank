# 🚀 Kodbank - Quick Start Guide

## Run Both Backend & Frontend in One Command

### Option 1: Using NPM (Recommended)
From the **kodbank** root directory:

```bash
npm run dev
```

or

```bash
npm start
```

**This will start:**
- ✅ Backend on http://localhost:5000
- ✅ Frontend on http://localhost:3000

---

### Option 2: Using Batch File (Windows)
Double-click **`start.bat`** in the kodbank folder

---

### Option 3: Using PowerShell Script (Windows)
```powershell
.\start.ps1
```

---

### Option 4: Manual Method (Separate Terminals)

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

---

## 📋 What Happens

1. Backend server starts on **PORT 5000** (Express API)
2. Frontend server starts on **PORT 3000** (React App)
3. Frontend automatically opens in your browser
4. You can register, login, and check balance with confetti animation! 🎉

---

## 🔧 Configuration

Backend runs with `.env` settings:
- Database: AIVEN MySQL
- JWT Secret: kodbank-super-secret-key-change-this-in-production
- API: http://localhost:5000/api

Frontend connects to Backend at:
- API Base URL: http://localhost:3000 (configured in axios)

---

## 📱 Test the App

1. **Register**: Create new account with username, email, phone, password
2. **Login**: Use registered credentials
3. **Check Balance**: See your ₹100,000 initial balance with confetti! 🎊

---

## ⚠️ Troubleshooting

### Port Already in Use?
```powershell
# Kill process on port 5000 (backend)
Get-Process -Id (Get-NetTCPConnection -LocalPort 5000).OwningProcess | Stop-Process -Force

# Kill process on port 3000 (frontend)
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess | Stop-Process -Force
```

### Dependencies Missing?
```bash
cd backend && npm install
cd ../frontend && npm install
cd ..
```

---

## 📂 Project Structure

```
kodbank/
├── backend/          # Express.js API
│  ├── server.js
│  ├── db.js
│  ├── routes/
│  └── package.json
├── frontend/         # React App
│  ├── src/
│  ├── public/
│  └── package.json
├── package.json      # Root config (concurrently)
├── start.bat         # Windows batch script
└── start.ps1         # PowerShell script
```

---

## ✨ Features

- ✅ User Registration with initial ₹100,000 balance
- ✅ JWT Authentication (24-hour tokens)
- ✅ Protected Balance Checking Endpoint
- ✅ Confetti Animation on Balance View
- ✅ AIVEN MySQL Database
- ✅ Vercel Ready for Deployment

---

**Happy Banking! 🏦💰**
