const express = require('express')
const router = express.Router()
const { registerUser, loginUser, getMe } = require('../controllers/userController')

const {protect} = require('../middleware/authMiddleware')
//adding a user 
router.post('/', registerUser)
//authenticate
router.post('/login', loginUser)
//get user info
router.get('/me', protect, getMe)





module.exports = router