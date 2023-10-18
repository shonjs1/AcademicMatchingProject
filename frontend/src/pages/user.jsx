import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import "../stylesheet/user.css";

const books = process.env.PUBLIC_URL + "/images/books.jpeg";
const profile = process.env.PUBLIC_URL + "/images/joy.jpeg";

export default function User() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user information from the backend here.
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/users/6530215adde1554f45d25b73/profile"); 
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error("Error fetching user data: ", error);
    }
  };

  return (
    <div className="container">
      <div className="main-body">
        <div className="row gutters-sm">
          <div className="col-md-4 mb-3">
            <div className="card">
              <div className="card-body">
                <div className="d-flex flex-column align-items-center text-center">
                  <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" className="rounded-circle" width="150" />
                  <div className="mt-3">
                    <h4></h4>
                    <p className="text-secondary mb-1"></p>
                    <p className="text-muted font-size-sm"></p>
                    <button className="btn btn-outline-primary">Message</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="card mt-3">
              <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                  <h6 className="mb-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="feather feather-globe mr-2 icon-inline"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <line x1="2" y1="12" x2="22" y2="12" />
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                    </svg>
                    Website
                  </h6>
                  <span className="text-secondary"></span>
                </li>
                {/* Add the rest of the list items here (GitHub, Twitter, Instagram, Facebook) */}
              </ul>
            </div>
          </div>
          <div className="col-md-8">
            <div className="card mb-3">
              <div className="card-body">
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Name</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    {user ? user.name : 'Loading...'}
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Major</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    {user ? user.major : 'Loading...'}
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Subject</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    {user ? user.subject : 'Loading...'}
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Course</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    {user ? user.classroom : 'Loading...'}
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-12">
                    <a className="btn btn-info" target="__blank" href="">
                      Edit
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="row gutters-sm">
              <div className="col-sm-6 mb-3">
                <div className="card h-100">
                  <div className="card-body">
                    <h6 className="d-flex align-items-center mb-3">
                      <i className="material-icons text-info mr-2">assignment</i>Project Status
                    </h6>
                    <small>Web Design</small>
                    <div className="progress mb-3" style={{ height: '5px' }}>
                      <div className="progress-bar bg-primary" role="progressbar" style={{ width: '80%' }} aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    {/* Add the rest of the project status information here */}
                  </div>
                </div>
              </div>
              <div className="col-sm-6 mb-3">
                <div className="card h-100">
                  <div className="card-body">
                    <h6 className="d-flex align-items-center mb-3">
                      <i className="material-icons text-info mr-2">assignment</i>Project Status
                    </h6>
                    {/* Add project status information here (similar to the previous card) */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

