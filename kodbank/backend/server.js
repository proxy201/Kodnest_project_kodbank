const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const pool = require('./db');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
  origin: process.env.CORS_ORIGIN || true,
  credentials: true
}));

// Routes
const authRoutes = require('./routes/auth');
const balanceRoutes = require('./routes/balance');

app.use('/api/auth', authRoutes);
app.use('/api/bank', balanceRoutes);

const frontendBuildPath = path.join(__dirname, '..', 'frontend', 'build');
const frontendIndexPath = path.join(frontendBuildPath, 'index.html');
const hasFrontendBuild = fs.existsSync(frontendIndexPath);

if (hasFrontendBuild) {
  app.use(express.static(frontendBuildPath));

  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) {
      return next();
    }

    return res.sendFile(frontendIndexPath);
  });
} else {
  console.warn('⚠️  Frontend build not found. Did you run `npm run build`?');
}

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ success: true, message: 'Server is running' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ success: false, message: 'Internal server error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Kodbank Backend Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
});
