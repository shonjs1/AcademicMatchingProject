// @desc Register New User 
// @route POST / api/users 
// @access Public 
const registerUser = (req, res) => {
    res.json({message: 'Register User'})
}

// @desc Authenticate a User 
// @route POST / api/users/login
// @access Public 
const loginUser = (req, res) => {
    res.json({message: 'Login User'})
}

// @desc Get user data
// @route GET / api/users/me
// @access Public 
const getMe = (req, res) => {
    res.json({message: 'Display User Info'})
}


module.exports = {
    registerUser,
    loginUser,
    getMe
}