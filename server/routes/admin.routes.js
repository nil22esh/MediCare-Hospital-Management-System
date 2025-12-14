import express from "express";
import uploadFile from "../middlewares/multer.middleware.js";
import {
  addDoctor,
  cancelAppointment,
  getAdminDashboard,
  getAllAppointments,
  getAllDoctors,
  loginAdmin,
} from "../controllers/admin.controller.js";
import { addDoctorValidations } from "../validations/doctor.validation.js";
import authAdmin from "../middlewares/authAdmin.middleware.js";
import { changeAvailability } from "../controllers/doctor.controller.js";

const adminRouter = express.Router();

adminRouter.post("/login", loginAdmin);
adminRouter.post(
  "/add-doctor",
  uploadFile.single("image"),
  authAdmin,
  addDoctorValidations,
  addDoctor
);
adminRouter.get("/all-doctors", authAdmin, getAllDoctors);
adminRouter.post("/change-availability", authAdmin, changeAvailability);
adminRouter.get("/all-appointments", authAdmin, getAllAppointments);
adminRouter.put("/cancel-appointment/:id", authAdmin, cancelAppointment);
adminRouter.put("/cancel-appointment/:id", authAdmin, cancelAppointment);
adminRouter.get("/get-admin-dashboard", authAdmin, getAdminDashboard);

export default adminRouter;
