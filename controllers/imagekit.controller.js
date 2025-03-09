import imagekit from "../utils/imageKit.js";

export const auth = async (req, res, next) => {
  try {
    const auth = await imagekit.getAuthenticationParameters();
    res.status(200).json({
      success: true,
      message: "Authentication successful",
      data: auth,
    });
  } catch (error) {
    next(error);
  }
};
