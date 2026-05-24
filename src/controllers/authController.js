const authService = require("../services/authService");
const defs = require("../responses");

const authController = {
    async register(req, res) {
        try {
            const resultCount = await authService.registerUser(req.body);
            return res.status(201).json(defs.response("Success", "User successfully created", resultCount));
        } catch (error) {
            const status = error.status || 500;
            return res.status(status).json(defs.response("Error", error.message || error, 0, null));
        }
    },

    async login(req, res) {
        try {
            const data = await authService.loginUser(req.body);
            return res.json(data);
        } catch (error) {
            const status = error.status || 500;
            return res.status(status).json(defs.response("Error", error.message || error, 0, null));
        }
    }
};

module.exports = authController;