const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userRepository = require("../repositories/userRepository");
const secret = require("../secret");

const authService = {
    async registerUser({ username, email, password }) {
        if (!username || !password || !email) {
            throw { status: 400, message: "Username, Email and password are required" };
        }

        const existingUsers = await userRepository.findByUsername(username);
        if (existingUsers.length > 0) {
            throw { status: 409, message: "User already exists" };
        }

        const hash = await bcrypt.hash(password, 10);
        await userRepository.create(username, email, hash);
        return existingUsers.length;
    },

    async loginUser({ username, password }) {
        const rows = await userRepository.findByUsername(username);
        if (rows.length === 0) {
            throw { status: 404, message: "Username or password invalid" };
        }

        const user = rows[0];
        const passCompare = await bcrypt.compare(password, user.password);
        if (!passCompare) {
            throw { status: 400, message: "Invalid credentials" };
        }

        const token = jwt.sign({ id: user.id, role: user.role }, secret.key, { expiresIn: '1h' });
        return { token };
    }
};

module.exports = authService;