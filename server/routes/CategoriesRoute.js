const express = require("express");
const router = express.Router();

// CONTROLLER IMPORTS
const {
  createCategory,
  getCategories,
} = require("../controllers/CategoriesController");

// ROUTES
router.get("/", getCategories);
router.post("/", createCategory);

module.exports = router;
