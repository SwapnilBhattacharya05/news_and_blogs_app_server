import express from "express";
import { imagekit } from "../config/imagekit.js";
import { Blog } from "../models/Blog.js";

const router = express.Router();

router.post("/upload-image", async (req, res) => {
  try {
    const { file, fileName } = req.body;
    const result = await imagekit.upload({ file, fileName });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/blogs", async (req, res) => {
  const { title, content, imageUrl, author } = req.body;
  const blog = new Blog({ title, content, imageUrl, author });
  await blog.save();
  res.json(blog);
});

export default router;
