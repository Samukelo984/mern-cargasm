const express = require("express");
const router = express.Router();

// CONTROLLERS IMPORT
const { createUser, loginUser } = require("../controllers/AuthController");

// ROUTES
router.post("/register", createUser);
router.post("/login", loginUser);

module.exports = router;
