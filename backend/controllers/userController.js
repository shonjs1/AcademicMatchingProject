const asyncHandler = require('express-async-handler')

const User = require('../models/userModel')


const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find()
    res.status(200).json(users)
})

const setUser = asyncHandler(async (req, res) => {
    if(!req.body.text) {
        res.status(400)
        throw new Error('User not found')
    }

    const user = await User.create({ 
        text: req.body.text
    })

    res.status(200).json(user)
})

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
})

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
})

module.exports = {
    getUsers,
    setUser,
    updateUser,
    deleteUser,
}