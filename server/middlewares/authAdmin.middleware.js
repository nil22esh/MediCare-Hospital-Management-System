import jwt from "jsonwebtoken";

const authAdmin = async (req, res, next) => {
  try {
    let adminToken;
    // Get token from header
    if (req.headers.authorization?.startsWith("Bearer")) {
      adminToken = req.headers.authorization.split(" ")[1];
    }
    // OR from cookie
    else if (req.cookies?.adminToken) {
      adminToken = req.cookies.adminToken;
    }
    if (!adminToken) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }
    const decoded = jwt.verify(adminToken, process.env.JWT_SECRET);
    // console.log("de--", decoded);
    req.user = decoded;
    if (decoded.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Forbidden: Admin access required.",
      });
    } else {
      next();
    }
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized: Admin access is required.",
    });
  }
};

export default authAdmin;
