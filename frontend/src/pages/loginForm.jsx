// Login.js
import React, { useState } from 'react';
import "../stylesheet/login_popup.css";
import { AiOutlineMail, AiOutlineLock, AiOutlineClose } from 'react-icons/ai';
import { Navbar, Nav, Button } from 'react-bootstrap';

export default function Login({ onClose, registerVisible }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function handleLogin(e) {
    e.preventDefault();
    // Code to handle login goes here
    onClose();
  }

  return (
    <div>
      <div className={`popup 'active-popup' : ''`}>
        <div className="popup-inner">
          <div className="form-box login">
            <h2>Login</h2>
            <form action="#" onSubmit={handleLogin}>
              <div className="input-box">
                <AiOutlineMail className="icon" />
                <input type="email" required placeholder="Email" />
                <label>Email</label>
              </div>
              <div className="input-box">
                <AiOutlineLock className="icon" />
                <input type="password" required placeholder="Password" />
                <label>Password</label>
              </div>
              <div className="remember-forgot">
                <label>
                  <input type="checkbox" /> Remember me
                </label>
                <a href="#">Forgot Password?</a>
              </div>
              <button type="submit" className="btn">
                <span className="icon">
                  <ion-icon name="log-in"></ion-icon>
                </span>
                <nav>
                  <Nav.Link href="/profile"> Login </Nav.Link>
                </nav>
              </button>
              <div className="login-register">
                <p>
                  Don't have an account?{' '}
                  <a href="#" onClick={registerVisible} className="register-link">
                    Register
                  </a>
                </p>
              </div>
              
              <div className="close-icon" onClick={onClose}>
                <AiOutlineClose />

              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
