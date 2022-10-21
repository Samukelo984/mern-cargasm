const express = require("express");
const router = express.Router();

// CONTROLLER IMPORTS
const {
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/UserController");
// ROUTES
router.get("/:id", getUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
