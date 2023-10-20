import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import "../stylesheet/user.css";


export default function Profile() {
  const [user, setUser] = useState(null);
  const [userID, setUserID] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
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

  const [isLoadingSubjects, setIsLoadingSubjects] = useState(true);
  const [isLoadingCourses, setIsLoadingCourses] = useState(true);

  //   /********************************************** */
  //we can make a function to get this accountID from login page. For now, we use this dummy one
  const accountID = "653020c8dde1554f45d25b71";
  //************************************************** */

  useEffect(() => {
    const fetchData = async () => {
      await fetchUserID();
      await fetchSubjects();
      if (userID) {
        await fetchUserData(userID);
      }
      if (editedUserData.subject) {
        await fetchCourses(editedUserData.subject);
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

  const isValidObjectId = (str) => /^[0-9a-fA-F]{24}$/.test(str);

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

  //fetch all subjects
  const fetchSubjects = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/subjects");
      if (!response.ok) {
        throw new Error("Failed to fetch subjects");
      }
      const data = await response.json();
      setSubjects(data);
      setIsLoadingSubjects(false);
    } catch (error) {
      console.error("Error fetching subjects: ", error);
    }
  };


  //fetch all courses associated with picked subject
  const fetchCourses = async (selectedSubjectId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/subjects/${selectedSubjectId}/courses`);
      if (!response.ok) {
        throw new Error("Failed to fetch courses");
      }
      const data = await response.json();
      setCourses(data);
      setIsLoadingCourses(false);
    } catch (error) {
      console.error("Error fetching courses: ", error);
    }
  };

  const handleSaveChanges = async () => {
    try {
      const subject = subjects.find((subject) => subject._id === editedUserData.subject);
      const classroom = courses.find((course) => course._id === editedUserData.classroom);
  
      const response = await fetch(`http://localhost:5000/api/users/${userID}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: editedUserData.name,
          major: editedUserData.major,
          // this part keep subject and course show up as id
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
                    <h4>{user ? user.name : 'Loading...'}</h4>
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
                      user ? user.name : 'Loading...'
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
                      user ? user.major : 'Loading...'
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
                        user.subject || 'No course selected'
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
                        user.classroom || 'No course selected'
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
                      user ? user.skillLevel : 'Loading...'
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
          </div>
        </div>
      </div>
    </div>
  );
}

