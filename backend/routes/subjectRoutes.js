const express = require('express');
const router = express.Router();
const { getSubjects, addSubjectsAndCourses } = require('../controllers/subjectController');
const Subject = require('../models/subjectModel');

// Define routes for subjects
router.get('/', getSubjects);
router.get('/:id/courses', async (req, res) => {
    //get courses associated with subject by subjectId
    const subjectId = req.params.id;
        try {
            const subject = await Subject.findById(subjectId);

            if (!subject) {
                res.status(404).json({ error: 'Subject not found' });
            } else {
                res.status(200).json(subject.courses);
            }
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
});

// Un-comment this when we need to add new subjects and courses.
// router.post('/', addSubjectsAndCourses)

module.exports = router;