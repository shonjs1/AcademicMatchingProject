import React, { useState, useEffect } from 'react';
import "../stylesheet/user.css";
import {  Button } from 'react-bootstrap';
const books = process.env.PUBLIC_URL + '/images/books.jpeg'
const profile = process.env.PUBLIC_URL + '/images/joy.jpeg'

export default function Profile() {
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [courses, setCourses] = useState([]);
  const [subjectName, setSubjectName] = useState('');

  useEffect(() => {
    // Fetch the list of subjects from the backend API.
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/subjects");
      if (!response.ok) {
        throw new Error('Failed to fetch subjects');
      }
      const data = await response.json();
      setSubjects(data);
    } catch (error) {
      console.error('Error fetching subjects: ', error);
    }
  };

  const handleSubjectChange = (event) => {
    const selectedSubjectId = event.target.value;
    setSelectedSubject(selectedSubjectId);

    // Fetch the list of courses for the selected subject.
    fetchCourses(selectedSubjectId);
    
    // Find and set the subject name based on the selected subject's ID.
    const selectedSubjectData = subjects.find((subject) => subject._id === selectedSubjectId);
    if (selectedSubjectData) {
      setSubjectName(selectedSubjectData.name);
    }
  };

  const fetchCourses = async (selectedSubjectId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/subjects/${selectedSubjectId}/courses`);
      if (!response.ok) {
        throw new Error('Failed to fetch courses');
      }
      const data = await response.json();
      setCourses(data);
    } catch (error) {
      console.error('Error fetching courses: ', error);
    }
  };

  return (
    <div>
      <h1>User Profile</h1>
      <div className="user-profile">
        {/* ...other components */}
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
      </div>
      <Button variant="primary">Save</Button>
    </div>
  );
}