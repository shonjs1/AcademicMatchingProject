const express = require('express')
const router = express.Router()
const { registerUser, loginUser, getMe, getUsers, setUser, updateUser, deleteUser, updateUserClassroom  } = require('../controllers/userController')

const {protect} = require('../middleware/authMiddleware')

// AUTHENTICATION CODE
//adding a user 
router.post('/', registerUser)
//authenticate
router.post('/login', loginUser)
//get user info
router.get('/me', protect, getMe)


// USER INFO CRUD 
router.route('/').get(getUsers).post(setUser)
router.get('/', getUsers)
router.post('/', setUser)

router.route('/:id').put(updateUser).delete(deleteUser)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)

// Add a new route to update the user's classroom
router.put('/:id/update-classroom', updateUserClassroom)

module.exports = router