import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import Login from '../pages/loginForm';

export default function CustomNavbar({ openLogin }) {
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
          <Nav.Link href="/profile">Profile</Nav.Link>
        </Nav>
        <Button variant="outline-light" className="btnLogin-popup" onClick={openLogin}>
          Login
        </Button>
      </Navbar.Collapse>
    </Navbar>
  );
}
