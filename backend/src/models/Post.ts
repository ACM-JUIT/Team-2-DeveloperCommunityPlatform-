import mongoose, { Schema } from "mongoose";

const PostSchema = new Schema(
  {
    author: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    likes: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Post =
  mongoose.models.Post || mongoose.model("Post", PostSchema);

export default Post;