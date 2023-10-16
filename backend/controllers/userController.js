const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const Group = require('../models/groupModel');


// Import the userCourse function. Working on it
// const userCourse = require('../path-to-userCourse');

// USERS CRUD API
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({})
    res.status(200).json(users)
});

const setUser = asyncHandler(async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// const setUser = asyncHandler(async (req, res) => {
//     if(!req.body.text) {
//         res.status(400)
//         throw new Error('Please add a text field')
//     }

//     const user = await User.create({ 
//         text: req.body.text
//     })

//     res.status(200).json(user)
// })

const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)

    if(!user) {
        res.status(400)
        throw new Error('User not found')
    }
// updatedUser function
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body,{
        new : true,
    })
    res.status(200).json(updatedUser)
});

const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    if(!user) {
        res.status(400)
        throw new Error('User not found')
    }

    //deleteUser function
    const deletedUser = await User.findByIdAndDelete(req.params.id, req.body,{
        new : true,
    })
    res.status(200).json(deletedUser)
});

// Function to update user's classroom with the result of Math 101, for now, in future by a function userClassroom() 
const updateUserClassroom = asyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            res.status(400);
            throw new Error('User not found');
        }

      // Call the userCourse function to get the course name
      // const courseName = userClassroom();

      // Update the user's Classroom with the course name
      // Update the name to Math 101 for now
        user.classroom = "Math 101";

      // Save the updated user object
        await user.save();

        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});



// TOP SECRET ALGORITHM !!! DO NOT SHARE !!!

const fetchUsers = async () => {
    try {
        const response = await fetch("http://localhost:5000/api/users");

        if (response.ok) {
            const data = await response.json();

            return data;
        } else {
            console.log("Not Successful");
            return null;
        }
    } catch (error) {
        console.error("ERROR:", error);
        throw error;
    }
};

// in review to delete
// function calculateMatchingParamsCount(user1, user2) {
//     let matchingParamsCount = 0;

//     if (user1.major === user2.major) {
//         matchingParamsCount++;
//     }

//     if (user1.subject === user2.subject) {
//         matchingParamsCount++;
//     }

//     if (user1.skillLevel === user2.skillLevel) {
//         matchingParamsCount++;
//     }

//     return matchingParamsCount;
// }

async function findBestMatch(user, users) {
    let bestMatch = null;
    let bestMatchingParamsCount = 0;

    for (let i = 0; i < users.length; i++) {
        const potentialMatch = users[i];
        
        if (user === potentialMatch || user.matched || potentialMatch.matched || user.classroom != potentialMatch.classroom) {
            continue;
        }

        let matchingParamsCount = 0;

        if (user.major === potentialMatch.major) {
            matchingParamsCount++;
        }

        if (user.subject === potentialMatch.subject) {
            matchingParamsCount++;
        }

        if (user.skillLevel === potentialMatch.skillLevel) {
            matchingParamsCount++;
        }

        if (matchingParamsCount > bestMatchingParamsCount) {
            bestMatch = potentialMatch;
            bestMatchingParamsCount = matchingParamsCount;
        }
    }

    return bestMatch;
}

// match all users
// async function matchUsers() {
//     const users = await fetchUsers();

//     const matchedPairs = [];
//     const finalUnmatchedUsers = [];

//     function addToMatchedPairs(user1, user2, matchingParamsCount) {
//         const userName1 = user1.name;
//         const userName2 = user2.name;
//         user1.matched = true;
//         user2.matched = true;
//         matchedPairs.push({ user1: userName1, user2: userName2, matchingParamsCount });
//     }

//     function addToFinalUnmatchedUsers(user) {
//         finalUnmatchedUsers.push(user);
//     }

//     for (let i = 0; i < users.length; i++) {
//         const user = users[i];
//         const bestMatch = await findBestMatch(user, users);

//         if (bestMatch) {
//             const matchingParamsCount = calculateMatchingParamsCount(user, bestMatch);

//             if (matchingParamsCount === 3) {
//                 addToMatchedPairs(user, bestMatch, 3);
//             } else if (matchingParamsCount === 2) {
//                 addToMatchedPairs(user, bestMatch, 2);
//             } else if (matchingParamsCount === 1) {
//                 addToMatchedPairs(user, bestMatch, 1);
//             } else {
//                 addToFinalUnmatchedUsers(user);
//             }
//         }
//     }
//     for (let i = 0; i < users.length; i++) {
//         const user = users[i];
//         if (!user.matched) {
//             finalUnmatchedUsers.push(user.name);
//         }
//     }

//     return {
//         allPairs: matchedPairs.concat(finalUnmatchedUsers),
//     };
// }

// matchUsers()
//     .then(({ allPairs }) => {
//         console.log('All pairs:', allPairs);
//     })
//     .catch((error) => {
//         console.error('Error:', error);
//     });

async function matchOneUser(userIdToMatch) {
    try {
        const user = await User.findById(userIdToMatch);

        if (!user) {
            return { error: 'User not found' };
        }

        const users = await fetchUsers();

        const bestMatch = await findBestMatch(
            user, 
            users.filter(u => u._id.toString() !== userIdToMatch)
        );

        if (bestMatch) {
            // Check if both users agree to form a group
            if (user.agreeToFormAGroup && bestMatch.agreeToFormAGroup) {
                // Create a group name by combining their names
                const groupName = `${user.name}_${bestMatch.name}`;

                // Check if the group with the same name already exists
                const existingGroup = await Group.findOne({ name: groupName });

                if (!existingGroup) {
                // Create a new group
                const group = await Group.create({
                    name: groupName,
                    members: [user._id, bestMatch._id],
                });

                // Update the users' matched status
                user.matched = true;
                //bestMatch.matched = true;
                await user.save();
                //await bestMatch.save();

                return {
                    message: 'Group created successfully',
                    groupName: group.name,
                    members: [user.name, bestMatch.name],
                };
                } else {
                return { message: 'Group with the same name already exists' };
                }
            } else {
                return { message: 'Both users must agree to form a group' };
            }
        } else {
            return { message: 'No suitable match found or User is already found a match' };
        }
    } catch (error) {
            return { error: error.message };
    }
};


module.exports = {
    getUsers,
    setUser,
    updateUser,
    deleteUser,
    updateUserClassroom,
    matchOneUser,
}