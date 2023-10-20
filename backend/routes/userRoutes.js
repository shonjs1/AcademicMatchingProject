const express = require("express");
const router = express.Router();
const {
  getUsers,
  setUser,
  updateUser,
  deleteUser,
  updateUserClassroom,
  matchOneUser,
} = require("../controllers/userController");
const User = require('../models/userModel');

// USER INFO CRUD
router.route("/").get(getUsers).post(setUser);

router.route("/:id").put(updateUser).delete(deleteUser);


// Add a new route to update the user's classroom
router.put("/:id/update-classroom", updateUserClassroom);

// Find matched user to current user's id
router.post("/:id/match-one-user", async (req, res) => {
  const userIdToMatch = req.params.id; // Get the user ID from the URL

  try {
    console.log("Before calling matchOneUser");
    const result = await matchOneUser(userIdToMatch);
    console.log("Succeed calling matchOneUser");

    // Handle the result and send a response
    res.status(200).json(result);
  } catch (error) {
    // Handle errors and send an error response
    res.status(500).json({ error: "Internal server error" });
  }
});

//get user by id
router.get('/:id/profile', async (req, res) => {
    const userID = req.params.id;
  
    try {
      const user = await User.findById(userID);
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      return res.status(200).json(user);
    } catch (error) {
      console.error('Error fetching user by ID:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  // get user data based on the account ID
  router.get('/:accountID', async (req, res) => {
    const accountID = req.params.accountID;
  
    try {
      const user = await User.findOne({ account: accountID });
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      return res.status(200).json(user);
    } catch (error) {
      console.error('Error fetching user by account ID:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  // get userID based on accountID
router.get('/userID/:accountID', async (req, res) => {
  const accountID = req.params.accountID;

  try {
    const user = await User.findOne({ account: accountID });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.status(200).json({ userID: user._id });
  } catch (error) {
    console.error('Error fetching userID by account ID:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Find matched users for all users in database
// router.post('/match-all-users', async (req, res) => {
//     try {
//         console.log('Before calling matchUsers');

//         // Call the matchUsers function from userController.js
//         const result = await matchUsers();

//         console.log('Succeeded calling matchUsers');

//         // Handle the result and send a response
//         res.status(200).json(result);
//     } catch (error) {
//         // Handle errors and send an error response
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });

module.exports = router;
