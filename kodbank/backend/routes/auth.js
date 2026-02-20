const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const pool = require('../db');

// Register endpoint
router.post('/register', async (req, res) => {
  let connection;
  try {
    const { username, password, email, phone } = req.body;

    // Validation
    if (!username || !password || !email || !phone) {
      return res.status(400).json({ 
        success: false, 
        message: 'All fields are required' 
      });
    }

    connection = await pool.getConnection();

    // Check if user already exists
    const [existingUsers] = await connection.query(
      'SELECT uid FROM KodUsers WHERE username = ? OR email = ?',
      [username, email]
    );

    if (existingUsers.length > 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'Username or Email already exists' 
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const uid = uuidv4();

    // Insert new user
    await connection.query(
      'INSERT INTO KodUsers (uid, username, email, password, phone, balance, role) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [uid, username, email, hashedPassword, phone, 100000, 'Customer']
    );

    return res.status(201).json({ 
      success: true, 
      message: 'User registered successfully. Please login.' 
    });
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Registration failed' 
    });
  } finally {
    if (connection) connection.release();
  }
});

// Login endpoint
router.post('/login', async (req, res) => {
  let connection;
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Username and password are required' 
      });
    }

    connection = await pool.getConnection();

    // Find user
    const [users] = await connection.query(
      'SELECT uid, username, password, role FROM KodUsers WHERE username = ?',
      [username]
    );

    if (users.length === 0) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid username or password' 
      });
    }

    const user = users[0];

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid username or password' 
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    );

    // Store token in database
    const tid = uuidv4();
    const expiryDate = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    await connection.query(
      'INSERT INTO UserTokens (tid, token, uid, expiry) VALUES (?, ?, ?, ?)',
      [tid, token, user.uid, expiryDate]
    );

    // Set cookie with token
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      sameSite: 'strict'
    });

    return res.status(200).json({ 
      success: true, 
      message: 'Login successful',
      token: token,
      user: {
        username: user.username,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Login failed' 
    });
  } finally {
    if (connection) connection.release();
  }
});

module.exports = router;
