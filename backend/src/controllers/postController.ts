import { Request, Response } from "express";
import Post from "../models/Post";

export const getPosts = async (req: Request, res: Response) => {
  try {
    const { tag } = req.query;

    const filter = tag
      ? { tags: String(tag) }
      : {};

    const posts = await Post.find(filter).sort({
      createdAt: -1,
    });

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

export const getPostById = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    res.status(200).json({
      success: true,
      post,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch post",
    });
  }
};

export const createPost = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      author,
      title,
      content,
      coverImage,
      tags,
    } = req.body;

    if (!author || !content) {
      return res.status(400).json({
        success: false,
        message: "Author and content are required",
      });
    }

    const post = await Post.create({
      author,
      title,
      content,
      coverImage,
      tags: Array.isArray(tags) ? tags : [],
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

export const updatePost = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    const post = await Post.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    res.status(200).json({
      success: true,
      post,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to update post",
    });
  }
};

export const likePost = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    const post = await Post.findByIdAndUpdate(
      id,
      {
        $inc: {
          likes: 1,
        },
      },
      {
        new: true,
      }
    );

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    res.status(200).json({
      success: true,
      post,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to like post",
    });
  }
};

export const deletePost = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    const post = await Post.findByIdAndDelete(id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to delete post",
    });
  }
};