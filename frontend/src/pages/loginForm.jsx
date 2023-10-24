// Login.js
import React, { useState } from 'react';
import "../stylesheet/login_popup.css";
import { AiOutlineMail, AiOutlineLock, AiOutlineClose } from 'react-icons/ai';
import { Navbar, Nav, Button } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';


export default function Login({ onClose, registerVisible, history }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    console.log('handleLogin called');
    console.log(email, password);
    // const navigate = useNavigate();
    // Code to handle login goes here

    try {
      const response = await fetch('http://localhost:5000/api/accounts/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      if (response.ok) {
        // Handle successful login (e.g., store token in localStorage)
        const data = await response.json();
        const token = data.token;
        console.log(token);
        // Store the token in localStorage
        window.localStorage.setItem('token', token);
        // Set login success to true
        // window.localStorage.setItem('loggedIn', true);
        setLoginSuccess(true);
        // Redirect the user to the profile page
        window.location.href = './profile';
        
      } else {
        // Handle login failure (e.g., show error message)
        const data = await response.json();
        console.error(data.message); // Log the error message
      }
    } catch (error) {
      console.error(error); // Handle network errors
    }
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
                <input
                  type="email"
                  required
                  placeholder="Email"
                  value={email} // Bind the value to the email state
                  onChange={(e) => setEmail(e.target.value)} />
                <label>Email</label>
              </div>
              <div className="input-box">
                <AiOutlineLock className="icon" />
                <input
                  type="password"
                  required
                  placeholder="Password"
                  value={password} // Bind the value to the password state
                  onChange={(e) => setPassword(e.target.value)}/>
                <label>Password</label>
              </div>

              {/* Remember me and Forgot Password */}
              <div className="remember-forgot">
                <label>
                  <input type="checkbox" /> Remember me
                </label>
                <a href="#">Forgot Password?</a>
              </div>

              {/* Login Button */}
              <button type="submit" className="btn">
                <span className="icon">
                  <ion-icon name="log-in"></ion-icon>
                </span>
                Login
              </button>

              {/* Conditional rendering of Nav.Link */}
              {loginSuccess ? (
                <nav>
                  <Nav.Link href="/profile">Profile</Nav.Link>
                </nav>
              ) : null}

              {/* Register Link */}
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
