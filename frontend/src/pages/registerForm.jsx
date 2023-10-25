// Register.js
import React, { useState } from 'react';
import { AiOutlineUser, AiOutlineMail, AiOutlineLock ,AiOutlineClose } from 'react-icons/ai';
import "../stylesheet/login_popup.css";

export default function Register({ onClose }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registrationStatus, setRegistrationStatus] = useState(null); // To track registration status

  async function handleRegister(e) {
    e.preventDefault();
  
    // Check if the username and email already exist
    const checkUserExistsData = { username, email };
  
    try {
      const checkUserExistsResponse = await fetch('http://localhost:5000/api/accounts/check-user-exists', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(checkUserExistsData),
      });
  
      if (!checkUserExistsResponse.ok) {
        // Handle error
        console.error('User existence check failed.');
        return;
      }
  
      const { exists } = await checkUserExistsResponse.json();
  
      if (exists.username || exists.email) {
        // Username or email already exists, handle the error
        console.error('Username or email already exists.');
        setRegistrationStatus('exists');
        return;
      }
  
      // Register the account
      const accountData = { email, password, username };
  
      const accountResponse = await fetch('http://localhost:5000/api/accounts/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(accountData),
      });
  
      if (!accountResponse.ok) {
        // Handle error
        console.error('Account registration failed.');
        return;
      }
  
      // Create an empty user and associate it with the account
      const userData = {
        account: accountResponse._id, // Use the _id of the created account
      };
  
      const userResponse = await fetch('http://localhost:5000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
  
      if (!userResponse.ok) {
        // Handle error
        console.error('User creation failed.');
        return;
      }
  
      // Registration successful, close the registration form
      setRegistrationStatus('success');
      onClose();
    } catch (error) {
      console.error('An error occurred:', error);
    }
  }

  return (
    <div className={`popup 'active-popup' : ''}`}>
      <div className="popup-inner">
        <div className="form-box login">
          <div className="form-box register">
            <h2>Registration</h2>
            <form onSubmit={handleRegister}>
              {/* Existing user notification */}
              {registrationStatus === 'exists' && (
                <div className="error-message">Username or email already exists.</div>
              )}

              {/* Successful registration notification */}
              {registrationStatus === 'success' && (
                <div className="success-message">Registration successful. Please log in.</div>
              )}

              {/* Input fields */}
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
