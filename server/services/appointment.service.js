import Appointment from "../models/appointment.model.js";
import Doctor from "../models/doctor.model.js";

export const findAppointmentsByUserId = async (userId) => {
  try {
    const appointments = await Appointment.find({ userId }).sort({
      createdAt: -1,
    });
    return appointments;
  } catch (error) {
    console.log("Error in findAppointmentsByUserId:", error.message);
    throw error;
  }
};

export const findAppointmentsById = async (appintmentId) => {
  try {
    const appointment = await Appointment.findById(appintmentId);
    return appointment;
  } catch (error) {
    console.log("Error in findAppointmentsById:", error.message);
    throw error;
  }
};

export const validateAppointment = async (id, res) => {
  const appointment = await findAppointmentsById(id);
  if (!appointment) {
    res.status(404).json({
      success: false,
      message: "Appointment not found",
    });
    return null;
  }
  if (appointment.appointmentStatus === "cancelled") {
    res.status(400).json({
      success: false,
      message: "Appointment is cancelled, payment not possible",
    });
    return null;
  }
  return appointment;
};

export const fetchAllDoctors = async () => {
  try {
    const doctors = await Doctor.find().select("-password");
    return doctors;
  } catch (error) {
    console.log("Error in getAllDoctors:", error);
    throw error;
  }
};

export const getAppointments = async () => {
  try {
    const data = await Appointment.find();
    return data;
  } catch (error) {
    console.log("Error in getAllAppointments:", error.message);
    throw error;
  }
};

export const getDoctorAppointmentsById = async (docId) => {
  try {
    const appointments = await Appointment.find({ docId: docId })
      .sort({ createdAt: -1 })
      .populate("userId", "-password");
    return appointments;
  } catch (error) {
    console.log("Error in getDoctorAppointmentsById:", error);
    throw error;
  }
};
