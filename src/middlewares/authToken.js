const jwt = require("jsonwebtoken");
const secret = require("../secret");
const defs = require("../responses");

const authToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json(defs.response("Error", "Unavailable token", 0, null));
    }
    
    const token = authHeader.split(" ")[1];
    try {
        req.userId = jwt.verify(token, secret.key).id;
        next();
    } catch (err) {
        return res.status(401).json(defs.response("Error", err.message || err, 0, null));
    }
};

module.exports = authToken;