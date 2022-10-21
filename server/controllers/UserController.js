const bcrypt = require("bcrypt");
// MODEL IMPORT
const UserModel = require("../models/UserModel");

// GET A USER
const getUser = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (error) {
    res.status(400).json(error);
  }
};
// UPDATE USER
const updateUser = async (req, res) => {
  const { id } = req.params;
  const updated = await UserModel.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );
  if (!updated) {
    res.status(404).json({ error: error.message });
  }
  res.status(200).json(updated);
};

//  DELETE USER
const deleteUser = async (req, res) => {
  const user = await UserModel.findById(req.params.id);

  await UserModel.deleteOne({ user });
  res.status(200).json({ id: req.params.id });
};
module.exports = { getUser, updateUser, deleteUser };
