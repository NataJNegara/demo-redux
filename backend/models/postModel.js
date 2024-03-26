import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    username: { type: String, required: true, ref: "User" },
    title: { type: String, required: true },
    body: { type: String, required: true },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", PostSchema);
export default Post;
