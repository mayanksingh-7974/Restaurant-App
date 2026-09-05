import JWT from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {
    // Get authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).send({
        success: false,
        message: "Please provide a valid auth token",
      });
    }
 
    // Extract token
    const token = authHeader.split(" ")[1];

    // Verify token
    const decoded = JWT.verify(token, process.env.JWT_SECRET);

    // Store user information in request
    req.user = decoded;

    next();

  } catch (error) {
    console.log("Auth Middleware Error:", error);

    return res.status(401).send({
      success: false,
      message: "Unauthorized user",
    });
  }
};

export default authMiddleware;