const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController');
const { getUsers, setUser, updateUser, deleteUser, updateUserClassroom, matchUsers, matchOneUser  } = require('../controllers/userController')

// USER INFO CRUD 
router.route('/').get(getUsers).post(setUser)
// router.get('/', getUsers)
// router.post('/', setUser)

router.route('/:id').put(updateUser).delete(deleteUser)
// router.put('/:id', updateUser)
// router.delete('/:id', deleteUser)

// Add a new route to update the user's classroom
router.put('/:id/update-classroom', updateUserClassroom)

// Find matched user to current user's id
router.post('/:id/match-one-user', async (req, res) => {
    const userIdToMatch = req.params.id; // Get the user ID from the URL

    try {
        console.log('Before calling matchOneUser');
        const result = await matchOneUser(userIdToMatch);
        console.log('Succeed calling matchOneUser');

        // Handle the result and send a response
        res.status(200).json(result);
    } catch (error) {
        // Handle errors and send an error response
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/match-all-users', async (req, res) => {
    try {
        console.log('Before calling matchUsers');
        
        // Call the matchUsers function from userController.js
        const result = await matchUsers();
        
        console.log('Succeeded calling matchUsers');

        // Handle the result and send a response
        res.status(200).json(result);
    } catch (error) {
        // Handle errors and send an error response
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router