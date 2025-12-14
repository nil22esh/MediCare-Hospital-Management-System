import Appointment from "../models/appointment.model.js";
import Doctor from "../models/doctor.model.js";

export const getDoctorById = async (docId) => {
  try {
    const doctor = await Doctor.findById(docId).select("-password");
    return doctor;
  } catch (error) {
    console.log("Error in getDoctorById:", error);
    throw error;
  }
};

export const findDoctorByEmail = async (email) => {
  try {
    const doctor = await Doctor.findOne({ email });
    return doctor;
  } catch (error) {
    console.log("Error in findDoctorByEmail:", error);
    throw error;
  }
};

export const getMyAppointments = async (doctorId) => {
  try {
    const appointments = await Appointment.find({ docId: doctorId })
      .sort({ createdAt: -1 })
      .populate("userId", "-password");
    return appointments;
  } catch (error) {
    console.log("Error in getMyAppointments:", error);
    throw error;
  }
};

export const getProfile = async (docId) => {
  try {
    const doctor = await Doctor.findById(docId).select("-password");
    return doctor;
  } catch (error) {
    console.log("Error in getProfile:", error);
    throw error;
  }
};

export const updateDoctor = async (docId, data) => {
  try {
    const doctor = await Doctor.findByIdAndUpdate(docId, data, { new: true });
    return doctor;
  } catch (error) {
    console.log("Error in getProfile:", error);
    throw error;
  }
};
