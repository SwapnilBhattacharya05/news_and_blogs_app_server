import express from "express";
import axios from "axios";
import { User } from "../models/User.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/google-login", async (req, res) => {
  const { token } = req.body;

  try {
    const googleResponse = await axios.get(
      `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${token}`
    );

    const { sub, name, email, picture } = googleResponse.data;

    let user = await User.findOne({ googleId: sub });
    if (!user) {
      user = new User({
        googleId: sub,
        name,
        email,
        picture,
      });
      await user.save();
    }

    const jwtToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({ token: jwtToken, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
