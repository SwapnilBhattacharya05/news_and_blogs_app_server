import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
  title: String,
  content: String,
  imageUrl: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

export const Blog = mongoose.model("Blog", BlogSchema);
