import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  try {
    let userToken;
    // Get token from header
    if (req.headers.authorization?.startsWith("Bearer")) {
      userToken = req.headers.authorization.split(" ")[1];
    }
    // OR from cookie
    else if (req.cookies?.userToken) {
      userToken = req.cookies.userToken;
    }
    if (!userToken) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }
    const decoded = jwt.verify(userToken, process.env.JWT_SECRET);
    req.user = { id: decoded.id };
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized: user access is required.",
    });
  }
};

export default authUser;
