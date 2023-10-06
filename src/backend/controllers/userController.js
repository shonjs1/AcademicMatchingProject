const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
// Import the userCourse function. Working on it
// const userCourse = require('../path-to-userCourse');
// @desc Register New User 
// @route POST / api/users 
// @access Public 
const registerUser = asyncHandler(async (req, res) => {
    const {name, email, password} = req.body 
    if(!name || !email || !password) {
        res.status(400)
        throw new Error('Please add all fields')
    }

    //Checks user existence 
    const userExists = await User.findOne({email})

    if(userExists){
        res.status(400)
        throw new Error('User already exists')
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create User
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else{
        res.status(400)
        throw new Error('Invalid user data')
    }

})

// @desc Authenticate a User 
// @route POST / api/users/login
// @access Public 
const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body

    // check for user email
    const user = await User.findOne({email})

    if(user && (await bcrypt.compare(password, user.password))) {
    res.json( { 
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid Credentials')
    }
    res.json({ message: 'Login User' })
})

// @desc Get user data
// @route GET / api/users/me
// @access Private 
const getMe = asyncHandler(async (req, res) => {
    const {_id, name, email} = await User.findById(req.user.id)

    res.status(200).json({
        id: _id,
        name, 
        email,
    })
})

//Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}

// USERS CRUD API
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({})
    res.status(200).json(users)
});

const setUser = asyncHandler(async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// const setUser = asyncHandler(async (req, res) => {
//     if(!req.body.text) {
//         res.status(400)
//         throw new Error('Please add a text field')
//     }

//     const user = await User.create({ 
//         text: req.body.text
//     })

//     res.status(200).json(user)
// })

const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)

    if(!user) {
        res.status(400)
        throw new Error('User not found')
    }
// updatedUser function
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

// Function to update user's classroom with the result of Math 101, for now, in future by a function userClassroom() 
const updateUserClassroom = asyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            res.status(400);
            throw new Error('User not found');
        }

      // Call the userCourse function to get the course name
      // const courseName = userClassroom();

      // Update the user's Classroom with the course name
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
    registerUser,
    loginUser,
    getMe,
    updateUserClassroom,
}