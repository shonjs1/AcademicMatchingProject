// Header.js
import React from 'react';

export default function Header ({ openLogin }) {

    return (
  <header>
    <h2 className="logo">Logo</h2>
    <nav className="navigation">
      <a href="index.html">Home</a>
      <a href="about.html">About</a>
      <a href="services.html">Services</a>
      <a href="contact.html">Contact</a>
      <button className="btnLogin-popup" onClick={openLogin}>
        Login
      </button>
    </nav>
  </header>
    );}

