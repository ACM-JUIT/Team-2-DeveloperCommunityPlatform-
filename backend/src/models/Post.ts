import mongoose, { Schema, Document } from "mongoose";

export interface IPost extends Document {
  author: string;
  title?: string;
  content: string;
  coverImage?: string;
  tags: string[];
  likes: number;
  createdAt: Date;
  updatedAt: Date;
}

const PostSchema = new Schema<IPost>(
  {
    author: {
      type: String,
      required: true,
      trim: true,
    },

    title: {
      type: String,
      trim: true,
    },

    content: {
      type: String,
      required: true,
      trim: true,
    },

    coverImage: {
      type: String,
      trim: true,
    },

    tags: {
      type: [String],
      default: [],
    },

    likes: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Post ||
  mongoose.model<IPost>("Post", PostSchema);