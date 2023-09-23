const User = require('../backend/models/userModel')

async function findBestMatch(user, users) {
    let bestMatch = null;
    let bestMatchingParamsCount = 0;

    for (let i = 0; i < users.length; i++) {
        const potentialMatch = users[i];
        if (user === potentialMatch || user.classroom !== potentialMatch.classroom) {
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
    const users = await User.find({}); 

    const matchedPairs = [];
    const finalUnmatchedUsers = [];

    const threeMatchedUsers = [];
    for (let i = 0; i < users.length; i++) {
        const user = users[i];
        const bestMatch = findBestMatch(user, users);

        if (
            bestMatch &&
            findBestMatch(bestMatch, users) === user &&
            findBestMatch(findBestMatch(bestMatch, users), users) === user
        ) {
            threeMatchedUsers.push({ user1: user, matchingParamsCount: 3 });
        }
    }

    const twoMatchedUsers = [];
    for (let i = 0; i < users.length; i++) {
        const user = users[i];
        if (!threeMatchedUsers.some((pair) => pair.user1 === user)) {
            const bestMatch = findBestMatch(user, users);

            if (
                bestMatch &&
                findBestMatch(bestMatch, users) === user &&
                findBestMatch(findBestMatch(bestMatch, users), users) !== user
            ) {
                twoMatchedUsers.push({ user1: user, user2: bestMatch, matchingParamsCount: 2 });
            }
        }
    }

    const oneMatchedUsers = [];
    for (let i = 0; i < users.length; i++) {
        const user = users[i];
        if (
            !threeMatchedUsers.some((pair) => pair.user1 === user) &&
            !twoMatchedUsers.some((pair) => pair.user1 === user || pair.user2 === user)
        ) {
            const bestMatch = findBestMatch(user, users);

            if (
                bestMatch &&
                findBestMatch(bestMatch, users) !== user
            ) {
                oneMatchedUsers.push({ user1: user, user2: bestMatch, matchingParamsCount: 1 });
            }
        }
    }

    for (let i = 0; i < users.length; i++) {
        const user = users[i];
        if (
            !threeMatchedUsers.some((pair) => pair.user1 === user) &&
            !twoMatchedUsers.some((pair) => pair.user1 === user || pair.user2 === user) &&
            !oneMatchedUsers.some((pair) => pair.user1 === user || pair.user2 === user)
        ) {
            finalUnmatchedUsers.push(user);
        }
    }

    const unmatchedPairs = [];
    for (let i = 0; i < finalUnmatchedUsers.length; i++) {
        for (let j = i + 1; j < finalUnmatchedUsers.length; j++) {
            unmatchedPairs.push({
                user1: finalUnmatchedUsers[i],
                user2: finalUnmatchedUsers[j],
                matchingParamsCount: 0,
            });
        }
    }

    const allPairs = matchedPairs.concat(threeMatchedUsers, twoMatchedUsers, oneMatchedUsers, unmatchedPairs);

    return {
        allPairs,
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