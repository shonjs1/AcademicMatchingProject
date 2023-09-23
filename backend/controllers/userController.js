const asyncHandler = require('express-async-handler')

const User = require('../models/userModel')
// Import the userCourse function. Working on it
//const userCourse = require('../path-to-userCourse');

const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find()
    res.status(200).json(users)
})

const setUser = asyncHandler(async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)

    if(!user) {
        res.status(400)
        throw new Error('User not found')
    }
//updatedUser function
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body,{
        new : true,
    })
    res.status(200).json(updatedUser)
});

const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    if(!user) {
        res.status(400)
        throw new Error('User not found')
    }

    //deleteUser function
    const deletedUser = await User.findByIdAndDelete(req.params.id, req.body,{
        new : true,
    })
    res.status(200).json(deletedUser)
});

// Function to update user's classroom with the result of userCourse
const updateUserClassroom = asyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            res.status(400);
            throw new Error('User not found');
        }

      // Call the userCourse function to get the course name
      // const courseName = userCourse();

      // Update the user's classroom with the course name
      // Update the name tho Math 101 for now
        user.classroom = "Math 101";

      // Save the updated user object
        await user.save();

        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = {
    getUsers,
    setUser,
    updateUser,
    deleteUser,
    updateUserClassroom,
}