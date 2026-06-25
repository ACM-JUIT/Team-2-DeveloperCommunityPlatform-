import express from "express";

import {
  registerUser,
  loginUser,
  getProfile,
} from "../controllers/auth.controller.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

// =========================
// Public Routes
// =========================
router.post("/register", registerUser);

router.post("/login", loginUser);

// =========================
// Protected Routes
// =========================
router.get("/profile", authMiddleware, getProfile);

export default router;
