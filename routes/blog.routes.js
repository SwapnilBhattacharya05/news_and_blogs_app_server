import { Router } from "express";
import {
  createBlog,
  updateBlog,
  allBlogs,
  deleteBlog,
} from "../controllers/blog.controller.js";

const blogRouter = Router();

blogRouter.get("/", allBlogs);
blogRouter.post("/", createBlog);
blogRouter.patch("/:id", updateBlog);
blogRouter.delete("/:id", deleteBlog);
export default blogRouter;
