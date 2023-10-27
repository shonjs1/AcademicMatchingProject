import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import "../stylesheet/user.css";
const profile = process.env.PUBLIC_URL + '/images/user-profile.png'


export default function Profile() {
  const [user, setUser] = useState(null);
  const [userID, setUserID] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [group, setGroup] = useState([]);
  const [editedUserData, setEditedUserData] = useState({
    name: "",
    major: "",
    subject: "",
    classroom: "",
    skillLevel: "",
  });

  const [subjects, setSubjects] = useState([]);
  const [subjectName, setSubjectName] = useState("");
  const [courses, setCourses] = useState([]);
  const [courseName, setCourseName] = useState("");
  const [accountID, setAccountID] = useState(null);
  const [secondPersonName, setSecondPersonName] = useState(""); 
  const [secondPersonEmail, setSecondPersonEmail] = useState(""); 

   // Define state variables for the modal
  const [showMatchModal, setShowMatchModal] = useState(false);
  const [matchInfo, setMatchInfo] = useState(null);

  useEffect(() => {
    getAccountId(); // Call the function to get the account ID
  }, []);

  // Function to fetch the account ID
  const getAccountId = async () => {
    try {
      const token = localStorage.getItem('token'); // Retrieve the JWT token
      if (!token) {
        throw new Error('No token found');
      }

      const response = await fetch('http://localhost:5000/api/accounts/me', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Include the JWT token in the Authorization header
        },
      });

      if (response.ok) {
        const data = await response.json();
        const accountID = data.id;
        setAccountID(accountID); // Set the account ID in the component's state
      } else {
        throw new Error('Failed to retrieve account ID'); // Handle the case where the request fails
      }
    } catch (error) {
      console.error('Error fetching account ID: ', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (accountID) {
        await fetchUserID();
        await fetchSubjects();
        if (userID) {
          await fetchUserData(userID);
        }
        if (editedUserData.subject) {
          await fetchCourses(editedUserData.subject);
        }
      }
    };
    fetchData();
  }, [accountID]);
  
  useEffect(() => {
    if (userID) {
      fetchUserData(userID);
    }
  }, [userID]);
  
  useEffect(() => {
    if (editedUserData.subject) {
      fetchCourses(editedUserData.subject);
    }
  }, [editedUserData.subject]);

  // Fetch the user ID based on the account ID
  const fetchUserID = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/users/userID/${accountID}`);

      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }

      const data = await response.json();
      const fetchedUserID = data.userID;
      setUserID(fetchedUserID);
    } catch (error) {
      console.error("Error fetching user ID: ", error);
    }
  };

  // Check if a string is a valid MongoDB ObjectID
  const isValidObjectId = (str) => /^[0-9a-fA-F]{24}$/.test(str);

  // Fetch the user data based on the user ID
  const fetchUserData = async (userID) => {
    try {
      if (!isValidObjectId(userID)) {
        throw new Error("Invalid user ID");
      }

      const response = await fetch(`http://localhost:5000/api/users/${userID}/profile`);
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      const data = await response.json();

      if (data.error && data.error === "User not found") {
        setUser(null);
      } else {
        const { name, major, subject, classroom, skillLevel } = data;
        setUser(data);
        setEditedUserData({
          name,
          major,
          subject,
          classroom,
          skillLevel 
        });

        // Fetch and set the subject and course names based on their IDs
        const selectedSubjectData = subjects.find((subject) => subject._id === subject);
      if (selectedSubjectData) {
        setSubjectName(selectedSubjectData.name);
      }

      const selectedCourseData = courses.find((course) => course._id === classroom);
      if (selectedCourseData) {
        setCourseName(selectedCourseData.name);
      }
      }

    } catch (error) {
      console.error("Error fetching user data: ", error);
    }
  };

  // Fetch all subjects
  const fetchSubjects = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/subjects");
      if (!response.ok) {
        throw new Error("Failed to fetch subjects");
      }
      const data = await response.json();
      setSubjects(data);
    } catch (error) {
      console.error("Error fetching subjects: ", error);
    }
  };

  useEffect(() => {
    if (userID) {
      fetchGroup();
    }
  }, [userID]);

  //Fetch Users Group
  const fetchGroup = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/groups");
      if (!response.ok) {
        throw new Error("Failed to fetch groups");
      }
      const groups = await response.json();
      
      // Find group where your user is a member
      const userGroup = groups.find((group) => group.members.includes(userID)); // Assuming userID contains your user's ID
  
      if (userGroup) {
        
        setGroup(userGroup);
  
        if (userGroup.members.length >= 2) {
          const secondPerson = userGroup.members.find((member) => member !== userID);
          if (secondPerson) {
            const secondPersonName = secondPerson.name;
            console.log(secondPersonName);
            const secondPersonEmail = secondPerson.email;
            setSecondPersonName(secondPersonName);
            setSecondPersonEmail(secondPersonEmail);
          }
        }
      } else {
        console.log("User is not in any group.");
      }
    } catch (error) {
      console.error("Error fetching groups: ", error);
    }
  };


  // Fetch all courses associated with picked subject
  const fetchCourses = async (selectedSubjectId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/subjects/${selectedSubjectId}/courses`);
      if (!response.ok) {
        throw new Error("Failed to fetch courses");
      }
      const data = await response.json();
      setCourses(data);
    } catch (error) {
      console.error("Error fetching courses: ", error);
    }
  };

  const handleSaveChanges = async () => {
    try {
      const subject = subjects.find((subject) => subject._id === editedUserData.subject);
      const classroom = courses.find((course) => course._id === editedUserData.classroom);

      // Check if any required field is empty before saving
    if (
      !editedUserData.name ||
      !editedUserData.major ||
      !editedUserData.subject ||
      !editedUserData.classroom ||
      !editedUserData.skillLevel
    ) {
      alert("Please fill in all required fields before saving.");
      return;
    }
  
      const response = await fetch(`http://localhost:5000/api/users/${userID}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: editedUserData.name,
          major: editedUserData.major,
          // This part keep subject and course show up as id
          subject: subject ? subject.name : "",
          classroom: classroom ? classroom.name : "",
          skillLevel: editedUserData.skillLevel,
        }),
      });
  
      if (response.ok) {
        // After saving, update the user data and turn off edit mode
        fetchUserData(userID);
        setIsEditing(false);

        // Update subjectName and courseName based on selected subject and course
        setSubjectName(subject ? subject.name : "");
        setCourseName(classroom ? classroom.name : "");

      } else {
        throw new Error("Failed to save changes");
      }
    } catch (error) {
      console.error("Error saving changes: ", error);
    }
  };

  const handleEditClick = () => {
    if (!isEditing) {
      // If entering edit mode, copy the current data to the editing fields
      setEditedUserData({
        name: user ? user.name : "",
        major: user ? user.major : "",
        subject: user ? user.subject : "",
        classroom: user ? user.classroom : "",
        skillLevel: user ? user.skillLevel : "",
      });
    }
    setIsEditing(!isEditing);
  };

     // Function to open the modal
    const [matchingUserInfo, setMatchingUserInfo] = useState(null);

    const handleCreateMatch = async () => {
      console.log("Creating a match...");
      try {
        const response = await fetch(`http://localhost:5000/api/users/${userID}/match-one-user`, {

    });
        console.log('Response:', response);
        
        if (response.status === 200) {
          const responseData = await response.json();
          console.log('Response Data:', responseData);

          if (responseData && responseData.message === "We found a match for you!") {
          // Access the matching user's information from the 'matched' object
            const matchInfo = responseData.matched;

            // Check if matchInfo is not empty and contains the expected data
            if (matchInfo) {
              console.log('Match Info:', matchInfo);
              setMatchingUserInfo(matchInfo);
              setShowMatchModal(true);
            } else {
              console.error('Match information is missing or empty.');
            }
          }
        } else {
          console.error('Failed to create a match');
        }
      } catch (error) {
        console.error('Error creating a match: ', error);
      }
    };

      // Function to close the modal
    const handleCloseMatchModal = () => {
      setShowMatchModal(false);
    };

  return (
    <div className="container">
      <div className="main-body">
        <div className="row gutters-sm">
          <div className="col-md-4 mb-3">

            <div className="card">
              <div className="card-body">
                <div className="d-flex flex-column align-items-center text-center">
                  <img src={profile} alt="Basic profile image" className="rounded-circle" width="70%" />
                  <div className="mt-3">
                    <h4>{user ? user.name : 'Loading...'}</h4>
                  </div>
                </div>
              </div>
            </div>

            <div className="card mt-3">
                  <h6 className="mb-0 align-items-center text-center">
                    About Me
                  </h6>
                  <span className="text-secondary"><p className="text-muted font-size-sm">I'm a student from WCCI with a flair for photography, avid reader, and design enthusiast. Love exploring new places and cuisines. Let's connect and create a study group! </p></span>

                {/* Add the rest of the list items here (GitHub, Twitter, Instagram, Facebook) */}
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
                    {isEditing ? (
                      <Form.Control
                        type="text"
                        value={editedUserData.name}
                        onChange={(e) =>
                        setEditedUserData({ 
                          ...editedUserData,
                          name: e.target.value })}
                      />
                    ) : (
                      user ? (
                        user.name || 'Enter your name'
                      ) : (
                        'Loading...'
                      )
                    )}
                  </div>
                </div>

                <hr />

                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Major</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    {isEditing ? (
                      <Form.Control
                        type="text"
                        value={editedUserData.major}
                        onChange={(e) =>
                        setEditedUserData({ 
                          ...editedUserData,
                          major: e.target.value })}
                      />
                    ) : (
                      user ? (
                        user.major || 'Enter your major'
                      ) : (
                        'Loading...'
                      )
                    )}
                  </div>
                </div>

                <hr />

                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Subject</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    {isEditing ? (
                        <Form.Control
                          as="select"
                          value={editedUserData.subject}
                          onChange={(e) =>
                          setEditedUserData({
                            ...editedUserData,
                            subject: e.target.value
                          })
                        }
                        >
                          <option value="">Select a subject</option>
                          {subjects.map((subject) => (
                            <option key={subject._id} value={subject._id}>
                              {subject.name}
                            </option>
                          ))}
                        </Form.Control>
                    ) : (
                      // Display the selected subject name
                      user ? (
                        user.subject || 'Select a subject'
                      ) : (
                        'Loading...'
                      )
                      
                    )}
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Course</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    {isEditing ? (
                      <Form.Control
                        as="select"
                        value={editedUserData.classroom}
                        onChange={(e) =>
                          setEditedUserData({
                            ...editedUserData,
                            classroom: e.target.value
                            })
                        }
                      >
                        <option value="">Select a course</option>
                        {courses.map((course) => (
                          <option key={course._id} value={course._id}>
                            {course.name}
                          </option>
                        ))}
                      </Form.Control>
                    ) : (
                      // Display the selected course name
                      user ? (
                        user.classroom || 'Select a course'
                      ) : (
                        'Loading...'
                      )
                    )}
                  </div>
                </div>

                <hr />

                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Skill Level</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    {isEditing ? (
                      <Form.Control
                        as="select"
                        value={editedUserData.skillLevel}
                        onChange={(e) =>
                          setEditedUserData({
                            ...editedUserData,
                            skillLevel: e.target.value,
                          })
                        }
                      >
                        <option value="">Select a skill level</option>
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                      </Form.Control>
                    ) : (
                      user ? (
                        user.skillLevel || 'Select your skill on this course'
                      ) : (
                        'Loading...'
                      )
                    )}
                  </div>
                </div>

                <hr />

                <div className="row">
                  <div className="col-sm-12">
                    {isEditing ? (
                      <Button variant="info" onClick={handleSaveChanges}>
                        Save Changes
                      </Button>
                    ) : (
                      <Button variant="info" onClick={handleEditClick}>
                        Edit
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="card mb-3">
              <div className="card-body">
                <div className="row">
                  <div className="col-sm-12 align-items-center text-center">
                    
                      {/* "Create A Match" button */}
                      <Button variant="outline-dark" onClick={handleCreateMatch}>
                        Create A Match
                      </Button>
                      
                      <h5 className="mb-0 ">Your Matched Buddy Info:</h5>
                      
                        <div className="row">
                          <div className="col-sm-3">
                            <h6 className="mb-0">Name</h6>
                          </div>
                          <div className="col-sm-9 text-secondary">
                              <Form.Control
                                type="text"
                                value={secondPersonName}
                                readOnly
                              />
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-sm-3">
                            <h6 className="mb-0">Email</h6>
                          </div>
                          <div className="col-sm-9 text-secondary">
                              <Form.Control
                                type="text"
                                value={secondPersonEmail}
                                readOnly
                              />
                          </div>
                        </div>
                      
                      {/* Modal for match information */}
                      <Modal show={showMatchModal} onHide={handleCloseMatchModal}>
                        <Modal.Header closeButton>
                          <Modal.Title>Match Details</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          {matchingUserInfo ? (
                            <div>
                              <p>Name: {matchingUserInfo.name}</p>
                              <p>Email: {matchingUserInfo.email}</p>
                              <p>Major: {matchingUserInfo.major}</p>
                              <p>Subject: {matchingUserInfo.subject}</p>
                              <p>Course: {matchingUserInfo.classroom}</p>
                              <p>Skill Level: {matchingUserInfo.skillLevel}</p>
                            </div>
                          ) : (
                            <p>Loading match information...</p>
                          )}
                        </Modal.Body>
                        <Modal.Footer>
                          <Button variant="secondary" onClick={handleCloseMatchModal}>
                            Close
                          </Button>
                        </Modal.Footer>
                      </Modal>
                <hr />

                  </div>
                </div>
                <hr />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}