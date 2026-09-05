import userModel from "../models/userModel.js";

const adminMiddleware = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user.id);

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    if (user.userType !== "admin") {
      return res.status(403).send({
        success: false,
        message: "Only admin can access this resource",
      });
    }

    next();
  } catch (error) {
    console.log("Admin Middleware Error:", error);

    return res.status(500).send({
      success: false,
      message: "Error in Admin Middleware",
      error: error.message,
    });
  }
};

export default adminMiddleware;