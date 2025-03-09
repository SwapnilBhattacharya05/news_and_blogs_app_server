import express from "express";
import cors from "cors";

import { CLIENT_URL, PORT } from "./config/env.js";

import connectToDatabase from "./database/mongodb.js";

import errorMiddelware from "./middlewares/error.middelware.js";

import cookieParser from "cookie-parser";

import userRouter from "./routes/user.routes.js";
import blogRouter from "./routes/blog.routes.js";
import imagekitRouter from "./routes/imagekit.routes.js";

const app = express();

app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser()); // READS COOKIES FOR INCOMING REQUEST

app.use("/api/v1/users", userRouter);
app.use("/api/v1/blogs", blogRouter);
app.use("/api/v1/images", imagekitRouter);

app.use(errorMiddelware);

app.get("/", (req, res) => {
  res.send("📰 News and Blogs Backend!");
});

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await connectToDatabase();
});
