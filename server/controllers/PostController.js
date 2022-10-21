// MODEL IMPORT
const PostModel = require("../models/PostModel");

// GET ALL POSTS
const getPosts = async (req, res) => {
  const username = req.query.user;
  const categoryName = req.query.categories;
  try {
    let posts;
    if (username) {
      posts = await PostModel.find({ username });
    } else if (categoryName) {
      posts = await PostModel.find({ categories: { $in: [categoryName] } });
    } else {
      posts = await PostModel.find({}).sort({ createdAt: -1 });
    }
    res.status(200).json(posts);
  } catch (error) {
    res.status(400).json(error);
  }
};
// GET A POST
const getPost = async (req, res) => {
  const { id } = req.params;
  const post = await PostModel.findById(id);
  if (!post) {
    return res.status(404).json("No such post found");
  }
  res.status(200).json(post);
};
// CREATE A POST
const createPost = async (req, res) => {
  const newPost = new PostModel(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (error) {
    res.status(400).json(error);
  }
};
// UPDATE A POST
const updatePost = async (req, res) => {
  const { id } = req.params;
  const updatedPost = await PostModel.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );
  if (!updatedPost) {
    res.status(404).json({ error: error.message });
  }
  res.status(200).json(updatedPost);
};
// DELETE A POST
const deletePost = async (req, res) => {
  const { id } = req.params;
  const post = await PostModel.findOneAndDelete({ _id: id });

  if (!post) {
    res.status(404).json({ error: error.message });
  }
  res.status(200).json(post);
};

module.exports = { getPosts, getPost, createPost, updatePost, deletePost };
