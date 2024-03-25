import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import Post from "../models/postModel.js";
import mongoose from "mongoose";

// @desc    get all post
// @route   GET /api/posts/
// @access  public
const getAllPost = asyncHandler(async (req, res) => {
  const post = await Post.find().sort({ createdAt: "desc" });
  res.status(200).json({ post });
});

// @desc    add new post
// @route   POST /api/posts/add
// @access  private(logged user)
const addPost = asyncHandler(async (req, res) => {
  const { title, body } = req.body;

  if (!title || !body) {
    throw new Error("Title and Body are required");
  }

  const user = await User.findById(req.user._id);

  if (user) {
    const post = await Post.create({
      user: req.user._id,
      title,
      body,
    });
    res.status(201).json({ post });
  } else {
    res.status(401);
    throw new Error("Unauthorized: access denied!");
  }
});

// @desc    get current user's post
// @route   GET /api/posts/post
// @access  private(logged user)
const getUserPost = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    const post = await Post.find({ user: req.user._id }).sort({
      createdAt: "desc",
    });
    res.status(200).json({ post });
  } else {
    res.status(401);
    throw new Error("Unauthorized: post not found");
  }
});

// @desc    delete user's post
// @route   DELETE /api/posts/:id
// @access  private
const deletePost = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    throw new Error("ID is invalid");
  }

  const user = await User.findById(req.user._id);
  const post = await Post.findById(req.params.id);

  if (!post) {
    throw new Error("ID is invalid");
  }

  if (user && post.user.equals(user._id)) {
    await post.deleteOne();
    res.status(200).json("Post deleted successfully!");
  } else {
    res.status(401);
    throw new Error("Unauthorized: delete failed");
  }
});

// @desc    update post
// @route   POST /api/posts/update
// @access  private(logged user)
const updatePost = asyncHandler(async (req, res) => {
  const { title, body } = req.body;

  if (!title || !body) {
    throw new Error("Title and Body are required");
  }

  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    throw new Error("ID is invalid");
  }

  const user = await User.findById(req.user._id);
  const post = await Post.findById(req.params.id);

  if (!post) {
    throw new Error("ID is invalid");
  }

  if (user && post.user.equals(user._id)) {
    await post.updateOne({ title, body });
    res.status(200).json({ success: "Post updated successfully" });
  } else {
    res.status(500);
    throw new Error("Update post failed");
  }
});

export { addPost, getAllPost, getUserPost, deletePost, updatePost };
