import jwt from "jsonwebtoken";
import { getDoctorById } from "../services/doctor.service.js";

const authDoctor = async (req, res, next) => {
  try {
    let doctorToken;
    // Get token from header
    if (req.headers.authorization?.startsWith("Bearer")) {
      doctorToken = req.headers.authorization.split(" ")[1];
    }
    // OR from cookie
    else if (req.cookies?.doctorToken) {
      doctorToken = req.cookies.doctorToken;
    }
    if (!doctorToken) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }
    const decoded = jwt.verify(doctorToken, process.env.JWT_SECRET);
    // console.log("de--", decoded);
    const user = await getDoctorById(decoded.id);
    req.user = user;
    if (user.role !== "doctor") {
      return res.status(403).json({
        success: false,
        message: "Forbidden: Doctor access required.",
      });
    } else {
      next();
    }
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized: Doctor access is required.",
    });
  }
};

export default authDoctor;
