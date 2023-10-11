const express = require('express')
const router = express.Router()
const { registerUser, loginUser, getMe } = require('../controllers/accountController')

const {protect} = require('../middleware/authMiddleware')

// AUTHENTICATION CODE
//adding a user 
router.post('/register', registerUser)
//authenticate
router.post('/login', loginUser)
//get user info
router.get('/me', protect, getMe)

module.exports = router