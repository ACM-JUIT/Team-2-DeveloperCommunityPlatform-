import { Router } from "express";
import {
  createComment,
  getCommentsByPost,
} from "../controllers/commentController";

const router = Router();

router.post("/", createComment);
router.get("/:postId", getCommentsByPost);

export default router;