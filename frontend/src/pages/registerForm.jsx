// Register.js
import React, { useState } from 'react';
import { AiOutlineUser, AiOutlineMail, AiOutlineLock ,AiOutlineClose } from 'react-icons/ai';
import { RiEyeLine, RiEyeOffLine } from 'react-icons/ri'; // Icons for show/hide password

import "../stylesheet/login_popup.css";


export default function Register({ onClose }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registrationStatus, setRegistrationStatus] = useState(null); // To track registration status
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility
  const [isMouseDown, setIsMouseDown] = useState(false); // To track mouse button state

  const handleSuccessClose = () => {
    // Close the success notification and reset the registration status
    setRegistrationStatus(null);
  };

  const togglePasswordVisibility = () => {
    // Toggle the state to show/hide the password
    setShowPassword(!showPassword);
  };

  const handleMouseDown = () => {
    // Set the mouse button state to "pressed" when the mouse button is pressed
    setIsMouseDown(true);
  };

  const handleMouseUp = () => {
    // Set the mouse button state to "released" when the mouse button is released
    setIsMouseDown(false);
  };

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
      const accountData = { username, email, password };
  
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
      
      const accountResponseData = await accountResponse.json(); // Parse JSON response
      const accountId = accountResponseData._id; // Extract the account ID

      // Create an empty user and associate it with the account
      const userData = {
        account: accountId, // Use the _id of the created account
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
      console.log('Registration successful');
    } catch (error) {
      console.error('An error occurred:', error);
    }
  }

  return (
    <div className={`popup ${registrationStatus ? 'active-popup' : ''}`}>
      <div className="popup-inner">
        <div className="form-box login">
          <div className="form-box register">
            <h2>Registration</h2>
            <form onSubmit={handleRegister}>
              {/* Input fields */}
              <div className="input-box">
                <AiOutlineUser className="icon" />
                <input
                  type="text"
                  required
                  placeholder="Username"
                  value={username} // Bind the value to the username state
                  onChange={(e) => setUsername(e.target.value)} // Handle input changes
                />
              </div>

              <div className="input-box">
                <AiOutlineMail className="icon" />
                <input
                  type="email"
                  required
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="input-box">
                <AiOutlineLock className="icon" />
                <input
                  type={showPassword ? 'text' : 'password'} // Conditionally set input type
                  required
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {/* Show/hide password toggle button */}
                <div
                  className={`password-toggle ${isMouseDown ? 'active' : ''}`} // Add 'active' class when mouse is pressed
                  onMouseDown={handleMouseDown}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp} // Ensure the state is updated when mouse leaves the toggle button
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <RiEyeOffLine  title="Hide Password"/> // Show "eye-off" icon when password is shown
                  ) : (
                    <RiEyeLine title="Show Password"/> // Show "eye" icon when password is hidden
                  )}
                </div>
              
              </div>
              
              <button type="submit" className="btn">
                Register
              </button>
              <div className="login-register">
                <p>
                  Already have an account?{' '}
                  <a href="#"  onClick={onClose}>
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

      {/* Existing user notification */}
      {registrationStatus === 'exists' && (
        <div className="popup-notification error">
          <div className="text-notification">Username or email already exists.</div>
        </div>
      )}

      {/* Successful registration notification */}
        {registrationStatus === 'success' && (
          <div className="popup-notification success">
            <div className="text-notification"> Registration successful. Please log in. </div>
            <br />
            <button
              type="button"
              className="btn-ok"
              onClick= {() =>{
                handleSuccessClose();
                onClose();
              }}
            >
              Great!
            </button>
          </div>
        )}


    </div>
  );
}
