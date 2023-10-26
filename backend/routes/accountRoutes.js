const express = require('express')
const router = express.Router()
const { registerUser, loginUser, getMe } = require('../controllers/accountController')
const User = require('../models/accountModel')

const {protect} = require('../middleware/authMiddleware')

// AUTHENTICATION CODE
//adding a user 
router.post('/register', registerUser)
//authenticate
router.post('/login', loginUser)
//get user info
router.get('/me', protect, getMe)

// Check if a user with the given username or email exists
router.post('/check-user-exists', async (req, res) => {
    const { username, email } = req.body;

    try {
        console.log('Request Data:', req.body);
        const account = await User.findOne({ $or: [{ username }, { email }] });

        console.log('User Found:', account);

        const exists = {
            username: !!account?.username,
            email: !!account?.email,
        };

        res.status(200).json({ exists });
    } catch (error) {
        console.error(error); // Log the error for debugging purposes
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router