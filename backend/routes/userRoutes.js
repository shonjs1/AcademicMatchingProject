const express = require('express')
const router = express.Router()
const { getUsers, setUser, updateUser, deleteUser, updateUserClassroom  } = require('../controllers/userController')

router.route('/').get(getUsers).post(setUser)
router.get('/', getUsers)
router.post('/', setUser)

router.route('/:id').put(updateUser).delete(deleteUser)
// router.put('/:id', updateUser)
router.delete('/:id', deleteUser)

// Add a new route to update the user's classroom
router.put('/:id/update-classroom', updateUserClassroom)

module.exports = router