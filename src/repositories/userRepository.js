const db = require("../config/cfg");


const userRepository = {
    async findByUsername(username) {
        const [rows] = await db.query("SELECT * FROM users WHERE username = ?", [username]);
        return rows;
    },

    async create(username, email, passwordHash) {
        const [result] = await db.query(
            "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
            [username, email, passwordHash]
        );
        return result;
    }
};

module.exports = userRepository;