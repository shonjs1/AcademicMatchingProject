// Login.js
import React, { useState } from 'react';
import { AiOutlineUser, AiOutlineMail, AiOutlineLock ,AiOutlineClose } from 'react-icons/ai';
import "../stylesheet/login_popup.css";

export default function Register({ onClose }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleRegister(e) {
    e.preventDefault();
    // Code to handle registration goes here
    onClose();
  }

  return (
    <div className={`popup 'active-popup' : ''}`}>
      <div className="popup-inner">
        <div className="form-box login">
          <div className="form-box register">
            <h2>Registration</h2>
            <form action="#">
              <div className="input-box">
                <AiOutlineUser className="icon" />
                <input type="text" required placeholder="Username" />
              </div>
              <div className="input-box">
                <AiOutlineMail className="icon" />
                <input type="email" required placeholder="Email" />
              </div>
              <div className="input-box">
                <AiOutlineLock className="icon" />
                <input type="password" required placeholder="Password" />
              </div>
              <div className="remember-forgot">
                <label>
                  <input type="checkbox" /> I agree to the terms & conditions
                </label>
              </div>
              <button type="submit" className="btn">
                Register
              </button>
              <div className="login-register">
                <p>
                  Already have an account?{' '}
                  <a  onClick={onClose}>
                    Login
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
