import {
  addPost,
  deletePost,
  getAllPost,
  getUserPost,
  updatePost,
} from "../controllers/postController.js";
import { protect } from "../middleware/authMiddleware.js";
import express from "express";

const router = express.Router();

// get all post
router.get("/", getAllPost);

// add post
router.post("/add", protect, addPost);

// get current user's post
router.get("/post", protect, getUserPost);

// delete user's post
router.delete("/:id", protect, deletePost);

// update user's post
router.put("/:id", protect, updatePost);

export { router as postRoutes };
