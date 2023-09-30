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

module.exports = fetchUsers;