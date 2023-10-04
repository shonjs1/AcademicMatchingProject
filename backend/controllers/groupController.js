const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const Group = require('../models/groupModel')


// Group CRUD API
const getGroups = asyncHandler(async (req, res) => {
    const groups = await Group.find({})
    res.status(200).json(groups)
});

const setGroup = asyncHandler(async (req, res) => {
    try {
        const group = await Group.create(req.body);
        res.status(201).json(group);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

const updateGroup = asyncHandler(async (req, res) => {
    const group = await Group.findById(req.params.id)

    if(!group) {
        res.status(400)
        throw new Error('User not found')
    }
// updatedUser function
    const updatedGroup = await User.findByIdAndUpdate(req.params.id, req.body,{
        new : true,
    })
    res.status(200).json(updatedGroup)
});

const deleteGroup = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    if(!group) {
        res.status(400)
        throw new Error('User not found')
    }

    //deleteUser function
    const deletedGroup = await User.findByIdAndDelete(req.params.id, req.body,{
        new : true,
    })
    res.status(200).json(deletedGroup)
}); 





module.exports = {
    //matchUsers,
    getGroups,
    setGroup,
    updateGroup,
    deleteGroup
};