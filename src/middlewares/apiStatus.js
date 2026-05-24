const defs = require("../responses");
const API_AVAILABLE = true;

const apiStatus = (req, res, next) => {
    if (API_AVAILABLE) {
        next();
    } else {
        return res.status(503).json(defs.response("Error", "Sorry, the API is in maintenance", 0, null));
    }
};

module.exports = apiStatus;