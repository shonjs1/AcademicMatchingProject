//const fs = require('fs');
const Subject = require('../models/subjectModel');

// Read the data from the courses.json file
// No need now.
//const rawData = fs.readFileSync('./course_db/courses.json');
//const data = JSON.parse(rawData);

// Function to add subjects and their courses to the database on mongoDB
// No need now.
// const addSubjectsAndCourses = async () => {
//     try {
//         for (const courseData of data.Course) {
//             const subjectName = courseData.subject;

//             // Check if the subject already exists or create it
//             let subject = await Subject.findOne({ name: subjectName });
//             if (!subject) {
//                 subject = new Subject({ name: subjectName });
//             }

//             // Check if the course with the same code already exists in the subject's courses
//             const existingCourse = subject.courses.find(
//                 (course) => course.code === courseData.course_code
//             );

//             if (!existingCourse) {
//                 // Create a new course and add it to the subject's courses array
//                 subject.courses.push({
//                 name: courseData.course_title,
//                 code: courseData.course_code,
//                 creditHours: courseData.credit_hours,
//                 });
//             } else {
//                 console.log(
//                 `Course ${courseData.course_code} already exists in subject ${subjectName}. Skipping.`
//                 );
//             }

//             // Save the subject with the updated courses
//             await subject.save();
//         }
//         console.log('Subjects and courses added successfully. (cancel Postman process when you see this line or it will keep running)');
//     } catch (error) {
//         console.error('Error adding subjects and courses:', error);
//     }
// };

// Get all subjects
const getSubjects = async (req, res) => {
    try {
        const subjects = await Subject.find();
        res.status(200).json(subjects);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

  // Delete a subject by ID
const deleteSubject = async (req, res) => {
    const subjectId = req.params.id;
    try {
        const deletedSubject = await Subject.findByIdAndDelete(subjectId);

        if (!deletedSubject) {
            res.status(404).json({ error: 'Subject not found' });
        } else {
            res.status(200).json(deletedSubject);
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


// Call the function to add subjects and courses
module.exports = {
    //addSubjectsAndCourses,
    getSubjects,
    deleteSubject,
}