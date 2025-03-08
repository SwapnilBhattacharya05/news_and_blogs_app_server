import User from "../models/user.model.js";

export const user = async (req, res, next) => {
  const { auth0Id, name, email, picture } = req.body;
  try {
    let user = await User.findOne({ auth0Id });

    if (!user) {
      user = new User({
        auth0Id,
        name,
        email,
        picture,
      });

      await user.save();

      res.status(201).json(user);
    }
  } catch (error) {
    next(error);
  }
};
