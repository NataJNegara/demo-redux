import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

//@desc     Auth user/set token
//@route    POST /api/users/auth
//@access   public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("All field are requried");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (user && isPasswordMatched) {
    generateToken(res, user._id);
    res.status(200).json({ _id: user._id, username: user.username, email });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

//@desc     Register a new user
//@route    POST /api/users
//@access   public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All field are required");
  }

  const isEmailExist = await User.findOne({ email });
  if (isEmailExist) {
    res.status(400);
    throw new Error("Email is already registered");
  }

  const user = await User.create({
    username,
    email,
    password,
  });

  if (user) {
    generateToken(res, user._id);
    res
      .status(201)
      .json({ _id: user._id, username: user.username, email: user.email });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

//@desc     Logout user
//@route    POST /api/users/logout
//@access   public
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(),
  });

  res.status(200).json({ message: "Logged out successfully" });
});

//@desc     Get user profile
//@route    GET /api/users/profile
//@access   private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    username: req.user.username,
    email: req.user.email,
  };

  res.status(200).json({ message: "User profile", user });
});

//@desc     Update user profile
//@route    PUT /api/users/profile
//@access   private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
};
