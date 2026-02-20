const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const pool = require('../db');

// Check balance endpoint (protected)
router.get('/check-balance', verifyToken, async (req, res) => {
  let connection;
  try {
    const username = req.user.username;

    connection = await pool.getConnection();

    // Fetch balance using username
    const [users] = await connection.query(
      'SELECT balance FROM KodUsers WHERE username = ?',
      [username]
    );

    if (users.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    const balance = users[0].balance;

    return res.status(200).json({ 
      success: true, 
      message: 'Balance fetched successfully',
      balance: balance,
      username: username
    });
  } catch (error) {
    console.error('Balance check error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch balance' 
    });
  } finally {
    if (connection) connection.release();
  }
});

module.exports = router;
