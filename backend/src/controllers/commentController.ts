import { Request, Response } from "express";
import Comment from "../models/Comment";
import Post from "../models/Post";

export const createComment = async (
  req: Request,
  res: Response
) => {
  try {
    const { postId, username, text } = req.body;

    if (!postId || !username || !text) {
      return res.status(400).json({
        success: false,
        message: "Post ID, username and text are required",
      });
    }

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    const comment = await Comment.create({
      postId,
      username,
      text,
    });

    res.status(201).json({
      success: true,
      comment,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to create comment",
    });
  }
};

export const getCommentsByPost = async (
  req: Request,
  res: Response
) => {
  try {
    const { postId } = req.params;

    const comments = await Comment.find({
      postId,
    }).sort({
      createdAt: 1,
    });

    res.status(200).json({
      success: true,
      count: comments.length,
      comments,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch comments",
    });
  }
};