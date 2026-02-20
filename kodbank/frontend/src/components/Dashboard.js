import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { checkBalance } from '../services/api';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    
    if (!token) {
      navigate('/login');
      return;
    }
    
    setUsername(user.username || '');
  }, [navigate]);

  const handleCheckBalance = async () => {
    setLoading(true);
    setError('');
    setShowCelebration(false);

    try {
      const token = localStorage.getItem('token');
      const response = await checkBalance(token);
      
      if (response.success) {
        setBalance(response.balance);
        setShowCelebration(true);
        
        // Trigger confetti animation
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
        
        // Hide celebration after 3 seconds
        setTimeout(() => setShowCelebration(false), 3000);
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch balance');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <div className="dashboard-header">
          <h1>🏦 Kodbank Dashboard</h1>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>

        <div className="welcome-section">
          <h2>Welcome, {username}! 👋</h2>
          <p>Manage your account and check your balance</p>
        </div>

        <div className="balance-section">
          {balance !== null && (
            <div className={`balance-display ${showCelebration ? 'celebrate' : ''}`}>
              <div className="balance-label">Your Current Balance</div>
              <div className="balance-amount">₹ {balance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</div>
            </div>
          )}
          
          {balance === null && !loading && (
            <p className="no-balance">Click the button below to check your balance</p>
          )}

          {error && <div className="error-message">{error}</div>}

          <button 
            onClick={handleCheckBalance} 
            disabled={loading}
            className="check-balance-btn"
          >
            {loading ? '⏳ Checking Balance...' : '💰 Check Balance'}
          </button>
        </div>

        <div className="dashboard-footer">
          <div className="account-info">
            <div className="info-item">
              <span className="label">Username:</span>
              <span className="value">{username}</span>
            </div>
            <div className="info-item">
              <span className="label">Account Type:</span>
              <span className="value">Customer</span>
            </div>
            <div className="info-item">
              <span className="label">Status:</span>
              <span className="value active">🟢 Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
