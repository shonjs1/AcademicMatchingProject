import React from 'react';
import { Navbar, Nav, Button, Image  } from 'react-bootstrap';
import Login from '../pages/loginForm';
import { Link } from 'react-router-dom';

const defaultProfileImage  = process.env.PUBLIC_URL + '/images/user-profile.png';

export default function CustomNavbar({ openLogin, isLoggedIn, onLogout, profileImage = defaultProfileImage  }) {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand href="/">Logo</Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarNav" />
      <Navbar.Collapse id="navbarNav">
        <Nav className="ml-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/about">About</Nav.Link>
          <Nav.Link href="/services">Services</Nav.Link>
          <Nav.Link href="/contact">Contact</Nav.Link>
          <Nav.Link href="/calendar">Calendar</Nav.Link>
          {/* <Nav.Link href="/profile">Profile</Nav.Link> */} {/* To access profile, click green login btn inside NAV login */}
        </Nav>
        {isLoggedIn && profileImage && (
          <Link to="/profile">
            <Image src={profileImage} roundedCircle width="40" height="40" className="mr-2" />
          </Link>
        )}

        <Button variant="outline-light" className="btnLogin-popup ml-2" onClick={isLoggedIn ? onLogout : openLogin}>
          {isLoggedIn ? 'Logout' : 'Login'}
        </Button>
      </Navbar.Collapse>
    </Navbar>
  );
}
