const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

// CREATE POST
router.post("/", async (req, res) => {
  try {
    console.log("🔥 POST HIT");
    console.log("BODY RECEIVED:", req.body);

    const post = await Post.create(req.body);

    console.log("✅ CREATED:", post);

    res.status(201).json(post);
  } catch (error) {
    console.log("❌ FULL ERROR:", error);

    res.status(500).json({
      message: error.message,
      fullError: error,
    });
  }
});

// GET ALL POSTS
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
