import express from "express";
import {
  validateBookAppointment,
  validateLogin,
  validateRegister,
} from "../validations/user.validation.js";
import {
  bookAppointment,
  cancelAppointment,
  getUserProfile,
  loginUser,
  razorpayPaymentAppointment,
  registerUser,
  updateUserProfile,
  userAppointmentsList,
  verifyAppointmentPayment,
} from "../controllers/user.controller.js";
import authUser from "../middlewares/authUser.middleware.js";
import uploadFile from "./../middlewares/multer.middleware.js";

const userRouter = express.Router();

userRouter.post("/register-user", validateRegister, registerUser);
userRouter.post("/login-user", validateLogin, loginUser);
userRouter.get("/get-user-profile", authUser, getUserProfile);
userRouter.put(
  "/update-user-profile",
  authUser,
  uploadFile.single("image"),
  updateUserProfile
);
userRouter.post(
  "/book-appointment",
  authUser,
  validateBookAppointment,
  bookAppointment
);
userRouter.get("/appointments-list", authUser, userAppointmentsList);
userRouter.put("/cancel-appointment/:id", authUser, cancelAppointment);
userRouter.put(
  "/razorpay-payment-appointment/:id",
  authUser,
  razorpayPaymentAppointment
);
userRouter.put("/verify-payment", authUser, verifyAppointmentPayment);

export default userRouter;
