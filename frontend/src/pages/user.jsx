import React from 'react';
import "../stylesheet/user.css";
import {  Button } from 'react-bootstrap';
const books = process.env.PUBLIC_URL + '/images/books.jpeg'
const profile = process.env.PUBLIC_URL + '/images/joy.jpeg'

export default function User() {
  return <div className="container">
    <div className="profile-container">
      <div className="banner">
        {/* <img src={books} alt="Banner Image" /> */}
      </div>
      <div className="profile-content">
        <div className="profile-card">
          <img src={profile} alt="Profile Image" />


          <h1 style={{color:'black'}}>Joy Wang</h1>
          <p class="title">Student of WWCI</p>
          <p>Computer Science</p>
          <p><b>1380:Data Science for all·1610:Computing in the Arts·1620:Visual imaging in the Electronic Age</b></p>
          <Button variant="outline-dark"  >
      Create A Match
        </Button>
          <p>Hello! my name is Joy Wang, Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde reprehenderit iste
            placeat</p>
            <p>veniam saepe! Explicabo rem quae totam commodi similique cumque quaerat doloribus. Tempore, ut ab</p>
          <p> maiores
            cum qui recusandae consequatur, quis doloribus porro magni, officia cupiditate. Ea am</p>
        </div>
      </div>
    </div>
  </div>
    ;
}