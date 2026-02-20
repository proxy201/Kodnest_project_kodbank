import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="home-content">
        <h1 className="home-title">🏦 Kodbank</h1>
        <p className="home-subtitle">Your Digital Banking Solution</p>
        
        <div className="features">
          <div className="feature">
            <span className="feature-icon">📱</span>
            <h3>Easy Registration</h3>
            <p>Create an account in minutes with just your basic details</p>
          </div>
          <div className="feature">
            <span className="feature-icon">🔒</span>
            <h3>Secure Login</h3>
            <p>JWT-based authentication for maximum security</p>
          </div>
          <div className="feature">
            <span className="feature-icon">💰</span>
            <h3>Check Balance</h3>
            <p>Instantly check your account balance anytime</p>
          </div>
        </div>

        <div className="cta-buttons">
          <button className="btn btn-primary" onClick={() => navigate('/register')}>
            Create Account
          </button>
          <button className="btn btn-secondary" onClick={() => navigate('/login')}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
