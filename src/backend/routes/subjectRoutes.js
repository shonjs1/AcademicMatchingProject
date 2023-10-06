const express = require('express');
const router = express.Router();
const { getSubjects, deleteSubject, addSubjectsAndCourses } = require('../controllers/subjectController');

// Define routes for subjects
router.get('/', getSubjects)

// Un-comment this when we need to add new subjects and courses.
// router.post('/', addSubjectsAndCourses)

module.exports = router;