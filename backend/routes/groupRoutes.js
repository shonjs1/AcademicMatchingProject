const express = require('express')
const router = express.Router()
const { getGroups, setGroup, disbandGroup } = require('../controllers/groupController')

// GROUP INFO CRUD 
router.route('/').get(getGroups).post(setGroup)

// Route to disband a group by its ID
router.delete('/:groupId/disband', async (req, res) => {
    const groupId = req.params.groupId; // Get the group ID from the URL

    try {
        const result = await disbandGroup(groupId);

        if (result.error) {
            // If there's an error, send an error response
            res.status(404).json({ error: result.error });
        } else {
            // If successful, send a success response
            res.status(200).json({ message: result.message });
        }
    } catch (error) {
        // Handle unexpected errors and send a generic error response
        res.status(500).json({ error: 'Internal server error' });
    }
})


module.exports = router