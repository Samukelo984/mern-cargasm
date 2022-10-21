const bcrypt = require("bcrypt");
// MODEL IMPORT
const UserModel = require("../models/UserModel");

// REGISTER NEW USER
const createUser = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = new UserModel({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json(error);
  }
};

// LOGIN
const loginUser = async (req, res) => {
  try {
    const user = await UserModel.findOne({ username: req.body.username });
    !user && res.status(400).json("Invalid credentials");

    const validated = await bcrypt.compare(req.body.password, user.password);
    !validated && res.status(400).json("Invalid credentials!");

    const { password, ...others } = user._doc;
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = { createUser, loginUser };
