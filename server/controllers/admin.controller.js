import { v2 as cloudinary } from "cloudinary";
import Doctor from "../models/doctor.model.js";
import jwt from "jsonwebtoken";
import {
  fetchAllDoctors,
  findAppointmentsById,
  getAppointments,
} from "../services/appointment.service.js";
import Appointment from "../models/appointment.model.js";
import { getDoctorById } from "../services/doctor.service.js";
import { getAllUsers } from "../services/user.service.js";

export const addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      speciality,
      password,
      degree,
      experience,
      about,
      available,
      fees,
      address,
      date,
      slots_booked,
    } = req.body;
    const imageFile = req.file;
    // check if email already exists
    const existingDoctor = await Doctor.findOne({ email: email });
    if (existingDoctor) {
      return res.status(400).json({
        success: false,
        message: "Doctor with this email already exists",
      });
    }
    // upload image to cloudinary
    const uploadedImage = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });
    const imageUrl = uploadedImage.secure_url;
    // create new doctor
    const newDoctor = new Doctor({
      name,
      email,
      speciality,
      password,
      degree,
      experience: experience,
      about,
      available,
      fees,
      address: JSON.parse(address),
      date: date || Date.now(),
      slots_booked,
      image: imageUrl,
    });
    await newDoctor.save();
    return res.status(201).json({
      success: true,
      message: "Doctor created successfully",
      // send doctor data except password
      doctor: {
        _id: newDoctor._id,
        name: newDoctor.name,
        email: newDoctor.email,
        speciality: newDoctor.speciality,
        degree: newDoctor.degree,
        experience: newDoctor.experience,
        about: newDoctor.about,
        available: newDoctor.available,
        fees: newDoctor.fees,
        address: newDoctor.address,
        date: newDoctor.date,
        slots_booked: newDoctor.slots_booked,
        image: newDoctor.image,
      },
    });
  } catch (error) {
    console.log("Error in addDoctor:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getAllDoctors = async (req, res) => {
  try {
    const doctors = await fetchAllDoctors();
    return res.status(200).json({
      success: true,
      message: "Doctors fetched successfully",
      count: doctors.length,
      doctors,
    });
  } catch (error) {
    console.log("Error in getAllDoctors:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      email !== process.env.ADMIN_EMAIL ||
      password !== process.env.ADMIN_EMAIL_PASSWORD
    ) {
      return res.status(401).json({
        success: false,
        message: "Invalid Admin Credentials!",
      });
    }
    const token = jwt.sign({ email, role: "admin" }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
      algorithm: "HS256",
    });
    res.cookie("adminToken", token);
    return res.status(200).json({
      success: true,
      message: "Admin logged in successfully!",
      adminToken: token,
    });
  } catch (error) {
    console.log("Error in loginAdmin:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getAllAppointments = async (req, res) => {
  try {
    const appointments = await getAppointments();
    if (!appointments && appointments.length === 0) {
      return res.status(400).json({
        success: false,
        message: "There is no appointment found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Appointments fetched successfully",
      count: appointments.length,
      appointments,
    });
  } catch (error) {
    console.log("Error in getAllAppointments:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const cancelAppointment = async (req, res) => {
  try {
    const user = req.user;
    const appointmentId = req.params.id;
    // authorization chck for admin
    if (!user || user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "You are not authorised to cancel appointment",
      });
    }
    if (!appointmentId) {
      return res.status(400).json({
        success: false,
        message: "AppointmentId is required",
      });
    }
    const appointment = await findAppointmentsById(appointmentId);
    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "appointment not found.",
      });
    }
    // prevent double cancellation
    if (appointment.appointmentStatus === "cancelled") {
      return res.status(400).json({
        success: false,
        message: "Appointment is already cancelled.",
      });
    }
    // prepare update object
    const updateData = {
      appointmentStatus: "cancelled",
    };
    if (appointment.paymentStatus === "paid") {
      updateData.paymentStatus = "failed";
    }
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      updateData,
      { new: true }
    );
    // remove canceled appointment slot from doctors
    const { slotDate, slotTime, docId } = appointment;
    const doctor = await getDoctorById(docId);
    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found.",
      });
    }
    // slot removal
    const slotsBooked = { ...doctor.slots_booked };
    if (slotsBooked[slotDate]) {
      slotsBooked[slotDate] = slotsBooked[slotDate].filter(
        (slot) => slot !== slotTime
      );
      await Doctor.findByIdAndUpdate(docId, { slots_booked: slotsBooked });
    }
    return res.status(200).json({
      success: true,
      message: "Appointment cancelled successfully.",
      updatedAppointment,
    });
  } catch (error) {
    console.log("Error in cancelAppointment:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getAdminDashboard = async (req, res) => {
  try {
    const user = req.user;
    if (user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "You are not authorised to access admin dashboard",
      });
    }
    const doctors = await fetchAllDoctors();
    const appointments = await getAppointments();
    const users = await getAllUsers();
    const dashBoardData = {
      TotalDoctors: doctors.length,
      TotalAppointments: appointments.length,
      TotalUsers: users.length,
      doctors,
      appointments,
      patients: users,
    };
    return res.status(200).json({
      success: true,
      message: "Admin dashboard fetched successfully",
      dashBoardData,
    });
  } catch (error) {
    console.log("Error in getAdminDashboard:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
