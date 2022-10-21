// MODEL IMPORT
const CategoryModel = require("../models/CategoriesModel");

// CREATE A CATEGORY
const createCategory = async (req, res) => {
  const newCategory = new CategoryModel(req.body);
  try {
    const savedCategory = await newCategory.save();
    res.status(200).json(savedCategory);
  } catch (error) {
    res.status(400).json(error);
  }
};

// GET CATEGORIES
const getCategories = async (req, res) => {
  const categories = await CategoryModel.find({}).sort({ createdAt: -1 });
  res.status(200).json(categories);
};

module.exports = { createCategory, getCategories };
