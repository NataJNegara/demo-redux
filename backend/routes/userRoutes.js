import express from "express";
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// login
router.post("/auth", authUser);
// register
router.post("/", registerUser);
// logout
router.post("/logout", logoutUser);

// get user profile
router.get("/profile", protect, getUserProfile);
// update user profile
router.put("/profile", protect, updateUserProfile);

export { router as userRoutes };
