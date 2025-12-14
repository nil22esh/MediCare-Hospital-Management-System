import express from "express";
import {
  cancelAppointment,
  confirmAppointment,
  doctorDashboard,
  doctorLogin,
  getDoctorsList,
  getMyAllAppointments,
  getMyProfile,
  updateMyProfile,
} from "../controllers/doctor.controller.js";
import { loginValidations } from "../validations/doctor.validation.js";
import authDoctor from "./../middlewares/authDoctor.middleware.js";

const doctorRouter = express.Router();

doctorRouter.get("/get-doctors-list", getDoctorsList);
doctorRouter.post("/login", loginValidations, doctorLogin);
doctorRouter.get("/get-all-my-appointments", authDoctor, getMyAllAppointments);
doctorRouter.put("/confirm-appointment/:id", authDoctor, confirmAppointment);
doctorRouter.put("/cancel-appointment/:id", authDoctor, cancelAppointment);
doctorRouter.get("/get-doctor-dashboard", authDoctor, doctorDashboard);
doctorRouter.get("/get-doctor-profile", authDoctor, getMyProfile);
doctorRouter.put("/update-doctor-profile", authDoctor, updateMyProfile);

export default doctorRouter;
