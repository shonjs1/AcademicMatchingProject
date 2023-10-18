import React, { useState, useEffect } from "react";
import {
  AiOutlineUser,
  AiOutlineMail,
  AiOutlineLock,
  AiOutlineClose,
} from "react-icons/ai";
import { Button } from "react-bootstrap";
import "../stylesheet/login_popup.css";
import "../stylesheet/user.css";

export default function UserProfile({ onClose }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [courses, setCourses] = useState([]);
  const [subjectName, setSubjectName] = useState("");

  useEffect(() => {
    // Fetch the list of subjects from the backend API.
    fetchSubjects();
  }, []);

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

  const handleSubjectChange = (event) => {
    const selectedSubjectId = event.target.value;
    setSelectedSubject(selectedSubjectId);

    // Fetch the list of courses for the selected subject.
    fetchCourses(selectedSubjectId);

    // Find and set the subject name based on the selected subject's ID.
    const selectedSubjectData = subjects.find(
      (subject) => subject._id === selectedSubjectId
    );
    if (selectedSubjectData) {
      setSubjectName(selectedSubjectData.name);
    }
  };

  const fetchCourses = async (selectedSubjectId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/subjects/${selectedSubjectId}/courses`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch courses");
      }
      const data = await response.json();
      setCourses(data);
    } catch (error) {
      console.error("Error fetching courses: ", error);
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    // Code to handle registration goes here
    onClose();
  };

  return (
    <div className={`popup 'active-popup' : ''}`}>
      <div className="popup-inner">
        <div className="form-box register">
          <h2>Registration</h2>
          <form action="#">
            <div className="input-box">
              <AiOutlineUser className="icon" />
              <input type="text" required placeholder="Username" />
            </div>
            <div className="input-box">
              <AiOutlineMail className="icon" />
              <input type="email" required placeholder="Email" />
            </div>
            <div className="input-box">
              <AiOutlineLock className="icon" />
              <input type="password" required placeholder="Password" />
            </div>
            <div className="remember-forgot">
              <label>
                <input type="checkbox" /> I agree to the terms & conditions
              </label>
            </div>
            <button type="submit" className="btn" onClick={handleRegister}>
              Register
            </button>
            <div className="login-register">
              <p>
                Already have an account? <a onClick={onClose}>Login</a>
              </p>
            </div>

            <div className="close-icon" onClick={onClose}>
              <AiOutlineClose />
            </div>
          </form>
        </div>

        <hr/>
        
        <div className="user-profile">
          <h1>User Profile</h1>
          <select value={selectedSubject} onChange={handleSubjectChange}>
            <option value="">Select a subject</option>
            {subjects.map((subject) => (
              <option key={subject._id} value={subject._id}>
                {subject.name}
              </option>
            ))}
          </select>
          <h2>Selected Subject: {subjectName}</h2>
          <h2>Select a Course:</h2>
          <select>
            <option value="">Select a course</option>
            {courses.map((course) => (
              <option key={course._id} value={course._id}>
                {course.name}
              </option>
            ))}
          </select>
          <Button variant="primary">Save</Button>
        </div>
      </div>
    </div>
  );
}
