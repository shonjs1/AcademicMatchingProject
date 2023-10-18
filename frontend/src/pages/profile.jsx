import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import "../stylesheet/user.css";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [userID, setUserID] = useState(null);

  // we can make a function to get this accountID from login page. For now, we use this dummy one
  const accountID = `6514900e19b4d1c3272b3fb0`;
  

  useEffect(() => {
    // Fetch user ID based on the account ID
    fetchUserID();
  }, [accountID]);

  

  const fetchUserID = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/users/userID/${accountID}`);

      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }

      const data = await response.json();
      // Assuming the response contains a 'userID' property
      const fetchedUserID = data.userID;
      setUserID(fetchedUserID);

      // Now that you have the userID, you can fetch the user's profile using that ID
      fetchUserData(fetchedUserID);
    } catch (error) {
      console.error("Error fetching user ID: ", error);
    }
  };

  // function from MongooseDB
  const isValidObjectId = (str) => {
    // Regular expression to check if str is a valid ObjectId
    const objectIdPattern = /^[0-9a-fA-F]{24}$/;
    return objectIdPattern.test(str);
  };

  const fetchUserData = async (userID) => {
    try {
      // Ensure userID is a valid ObjectId before making the request
      if (!isValidObjectId(userID)) {
        throw new Error("Invalid user ID");
      }
  
      const response = await fetch(`http://localhost:5000/api/users/${userID}/profile`);
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      const data = await response.json();
      
      // Handle the case when the user is not found
      if (data.error && data.error === "User not found") {
        console.error("User not found");
        // Handle accordingly, e.g., set user to null or display a message.
        setUser(null);
      } else {
        setUser(data);
      }
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
                  <div className="dropdown col-sm-9 text-secondary">
                    <div className="col-sm-9 text-secondary">
                      {user ? user.subject : 'Loading...'}
                    </div>
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
          </div>
        </div>
      </div>
    </div>
  );
}

