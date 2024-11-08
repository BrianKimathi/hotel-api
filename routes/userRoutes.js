const express = require("express");
const UserController = require("../controllers/userController");
const verifyToken = require("../middlewares/verifyToken.js"); // Import the middleware
const router = express.Router();

// Register route (no token required)
router.post("/register", UserController.register);

// Login route (no token required)
router.post("/login", UserController.login);

// Get user by ID route (token required)
router.get("/:id", verifyToken, UserController.getUser);

module.exports = router;
