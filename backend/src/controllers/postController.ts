import { Request, Response } from "express";
import Post from "../models/Post";

export const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: posts.length,
      posts,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch posts",
    });
  }
};

export const createPost = async (req: Request, res: Response) => {
  try {
    const { author, content } = req.body;

    if (!author || !content) {
      return res.status(400).json({
        success: false,
        message: "Author and content are required",
      });
    }

    const post = await Post.create({
      author,
      content,
      likes: 0,
    });

    res.status(201).json({
      success: true,
      post,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to create post",
    });
  }
};