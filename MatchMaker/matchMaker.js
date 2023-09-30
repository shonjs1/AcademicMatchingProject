const fetchUsers = require('./fetchUsers');

function calculateMatchingParamsCount(user1, user2) {
    let matchingParamsCount = 0;

    if (user1.Major === user2.Major) {
        matchingParamsCount++;
    }

    if (user1.subject === user2.subject) {
        matchingParamsCount++;
    }

    if (user1.skillLevel === user2.skillLevel) {
        matchingParamsCount++;
    }

    return matchingParamsCount;
}

async function findBestMatch(user, users) {
    let bestMatch = null;
    let bestMatchingParamsCount = 0;

    for (let i = 0; i < users.length; i++) {
        const potentialMatch = users[i];
        
        if (user === potentialMatch || user.matched || potentialMatch.matched) {
            continue;
        }

        let matchingParamsCount = 0;

        if (user.Major === potentialMatch.Major) {
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

async function matchUsers() {
    const users = await fetchUsers();

    const matchedPairs = [];
    const finalUnmatchedUsers = [];

    function addToMatchedPairs(user1, user2, matchingParamsCount) {
        const userName1 = user1.name;
        const userName2 = user2.name;
        user1.matched = true;
        user2.matched = true;
        matchedPairs.push({ user1: userName1, user2: userName2, matchingParamsCount });
    }

    function addToFinalUnmatchedUsers(user) {
        finalUnmatchedUsers.push(user);
    }

    for (let i = 0; i < users.length; i++) {
        const user = users[i];
        const bestMatch = await findBestMatch(user, users);

        if (bestMatch) {
            const matchingParamsCount = calculateMatchingParamsCount(user, bestMatch);

            if (matchingParamsCount === 3) {
                addToMatchedPairs(user, bestMatch, 3);
            } else if (matchingParamsCount === 2) {
                addToMatchedPairs(user, bestMatch, 2);
            } else if (matchingParamsCount === 1) {
                addToMatchedPairs(user, bestMatch, 1);
            } else {
                addToFinalUnmatchedUsers(user);
            }
        }
    }
    for (let i = 0; i < users.length; i++) {
        const user = users[i];
        if (!user.matched) {
            finalUnmatchedUsers.push(user.name);
        }
    }

    return {
        allPairs: matchedPairs.concat(finalUnmatchedUsers),
    };
}

matchUsers()
    .then(({ allPairs }) => {
        console.log('All pairs:', allPairs);
    })
    .catch((error) => {
        console.error('Error:', error);
    });

module.exports = {
    matchUsers,
};