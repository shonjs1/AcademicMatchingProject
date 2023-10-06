const mongoose = require('mongoose');

// Define the schema for a course
const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
        unique: true,
    },
    creditHours: {
        type: Number,
        required: true,
    },
});

// Define the schema for a subject
const subjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    courses: [courseSchema], // Embed the course schema as an array
});

// Create the Subject model
const Subject = mongoose.model('Subject', subjectSchema);

module.exports = Subject;