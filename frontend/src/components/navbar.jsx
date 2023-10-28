import React from 'react';
import { Navbar, Nav, Button, Image } from 'react-bootstrap';
import Login from '../pages/loginForm';
import { Link } from 'react-router-dom';
import "../stylesheet/navbar.css";
const logo = process.env.PUBLIC_URL + '/images/AT-logo.png';
const defaultProfileImage  = process.env.PUBLIC_URL + '/images/user-profile.png';

export default function CustomNavbar({ openLogin, isLoggedIn, onLogout, profileImage = defaultProfileImage  }) {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="custom-text">
      <Navbar.Brand href="/">
        <Image src={logo} width="50" height="50" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarNav" />
      <Navbar.Collapse id="navbarNav">
        <Nav className="ml-auto mr-auto custom-text">
          <Nav.Link className="custom-text" href="/">Home</Nav.Link>
          <Nav.Link className="custom-text" href="/about">About</Nav.Link>
          <Nav.Link className="custom-text" href="/services">Services</Nav.Link>
          <Nav.Link className="custom-text" href="/contact">Contact</Nav.Link>
          <Nav.Link className="custom-text" href="/calendar">Calendar</Nav.Link>
          {/* <Nav.Link href="/profile">Profile</Nav.Link> */} {/* To access profile, click green login btn inside NAV login */}
        </Nav>
        {isLoggedIn && profileImage && (
          <Link to="/profile">
            <Image src={profileImage} roundedCircle width="40" height="40"/>
          </Link>
        )}

        <Button variant="outline-light" className="btnLogin-popup ml-2 custom-text" onClick={isLoggedIn ? onLogout : openLogin}>
          {isLoggedIn ? 'Logout' : 'Login'}
        </Button>
      </Navbar.Collapse>
    </Navbar>
  );
}
