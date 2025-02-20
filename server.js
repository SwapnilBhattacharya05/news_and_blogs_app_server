import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(cors(process.env.CLIENT_URL));
app.use(express.json());

const PORT = process.env.PORT || 8000;

app.use(cors(process.env.CLIENT_URL));
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/api", blogRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
