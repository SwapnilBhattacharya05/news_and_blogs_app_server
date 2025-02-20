import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  googleId: String,
  name: String,
  email: String,
  picture: String,
});

export const User = mongoose.model("User", UserSchema);
