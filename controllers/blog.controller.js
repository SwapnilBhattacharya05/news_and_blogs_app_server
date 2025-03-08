import Blog from "../models/blog.model.js";
import User from "../models/user.model.js";

export const createBlog = async (req, res, next) => {
  const { title, content, image, auth0Id } = req.body;

  try {
    const user = await User.findOne({ auth0Id });
    if (!user) return res.status(404).json({ error: "User not found" });

    const blog = new Blog({ title, content, image, author: user._id });
    await blog.save();

    user.blogs.push(blog._id);
    await user.save();

    res.status(201).json(blog);
  } catch (error) {
    next(error);
  }
};

export const allBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find().populate("author");
    res.status(200).json(blogs);
  } catch (error) {
    next(error);
  }
};

export const updateBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) return res.status(404).json({ error: "Blog not found" });

    // Ensure only the blog author can edit it
    const { auth0Id } = req.body;
    if (!auth0Id) return res.status(400).json({ error: "auth0Id is required" });

    const user = await User.findOne({ auth0Id });
    if (!user || blog.author.toString() !== user._id.toString())
      return res.status(401).json({ error: "Unauthorized" });

    blog.title = req.body.title || blog.title;
    blog.content = req.body.content || blog.content;
    blog.image = req.body.image || blog.image;

    await blog.save();

    const updatedBlog = await Blog.findById(req.params.id); // Fetch the latest version
    res.status(200).json(updatedBlog);
  } catch (error) {
    next(error);
  }
};

export const deleteBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) return res.status(404).json({ error: "Blog not found" });

    const auth0Id = req.headers.authorization?.split(" ")[1];
    if (!auth0Id) return res.status(400).json({ error: "auth0Id is required" });

    const user = await User.findOne({ auth0Id });
    if (!user || blog.author.toString() !== user._id.toString())
      return res.status(401).json({ error: "Unauthorized" });

    await Blog.findByIdAndDelete(req.params.id);
    // $pull => pulls the blog id from the user
    await User.updateOne({ _id: user._id }, { $pull: { blogs: blog._id } });
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    next(error);
  }
};
