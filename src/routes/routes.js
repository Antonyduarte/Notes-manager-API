const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const noteController = require("../controllers/noteController");

const authToken = require("../middlewares/authToken");
const apiStatus = require("../middlewares/apiStatus");
const defs = require("../responses");

// Middleware Global de Status da API
router.use(apiStatus);

// Auth Routes
router.post("/register", authController.register);
router.post("/login", authController.login);

// Notes Routes (Protegidas)
router.get("/notes", authToken, noteController.getAll);
router.get("/note/:id", authToken, noteController.getById);
router.get("/note/search/:note", authToken, noteController.search);
router.post("/note", authToken, noteController.create);
router.put("/note/:id", authToken, noteController.update);
router.delete("/notes", authToken, noteController.deleteAll);
router.delete("/note/:id", authToken, noteController.deleteById);

// Fallback 404 para rotas não encontradas
router.use((req, res) => {
    res.status(404).json(defs.response("Error", "Route NOT found", 0, null));
});

module.exports = router;