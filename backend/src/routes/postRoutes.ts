import { Router } from "express";
import {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  likePost,
  deletePost,
} from "../controllers/postController";

const router = Router();

router.get("/", getPosts);
router.post("/", createPost);

router.get("/:id", getPostById);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);

router.patch("/:id/like", likePost);

export default router;