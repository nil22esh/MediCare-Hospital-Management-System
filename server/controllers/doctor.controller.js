import Appointment from "../models/appointment.model.js";
import Doctor from "../models/doctor.model.js";
import { getDoctorAppointmentsById } from "../services/appointment.service.js";
import {
  findDoctorByEmail,
  getMyAppointments,
  getProfile,
  updateDoctor,
} from "../services/doctor.service.js";

export const getDoctorsList = async (req, res) => {
  try {
    const doctors = await Doctor.find({}).select(["-password", "-email"]);
    return res.status(200).json({
      success: true,
      message: "Doctors list fetched successfully",
      count: doctors.length,
      doctors,
    });
  } catch (error) {
    console.log("Error in getDoctorsList:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const changeAvailability = async (req, res) => {
  try {
    const { doctorId } = req.body;
    if (!doctorId) {
      return res.status(400).json({
        success: false,
        message: "Doctor ID is required",
      });
    }
    // console.log("id-------", doctorId);
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }
    doctor.available = !doctor.available;
    await doctor.save();
    return res.status(200).json({
      success: true,
      message: "Availability changed successfully",
    });
  } catch (error) {
    console.log("Error in changeAvailability:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const doctorLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const checkDoctor = await findDoctorByEmail(email);
    if (!checkDoctor) {
      return res.status(400).json({
        success: false,
        message: "Invalid email and password",
      });
    }
    const isValidPassword = await checkDoctor.comparePassword(password);
    if (!isValidPassword) {
      return res.status(400).json({
        success: false,
        message: "Invalid email and password",
      });
    }
    const token = checkDoctor.jwtToken();
    res.cookie("doctorToken", token, {
      maxAge: 6 * 60 * 60 * 1000,
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    });
    return res.status(200).json({
      success: true,
      message: "Doctor logged in successfully",
      Doctor: checkDoctor,
      doctorToken: token,
    });
  } catch (error) {
    console.log("Error in doctorLogin:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getMyAllAppointments = async (req, res) => {
  try {
    const doctorId = req.user._id;
    const appointments = await getMyAppointments(doctorId);
    return res.status(200).json({
      success: true,
      message: "Appointments fetched successfully",
      count: appointments.length,
      appointments,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const confirmAppointment = async (req, res) => {
  try {
    const doctorId = req.user.id;
    const appointmentId = req.params.id;
    if (!appointmentId) {
      return res.status(400).json({
        success: false,
        message: "Appointment ID is required",
      });
    }
    // Find appointment by ID AND doctor
    const appointment = await Appointment.findOne({
      _id: appointmentId,
      docId: doctorId,
    });
    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found or unauthorized",
      });
    }
    if (appointment.appointmentStatus === "cancelled") {
      return res.status(400).json({
        success: false,
        message: "Cancelled appointment cannot be confirmed",
      });
    }
    if (appointment.appointmentStatus === "confirmed") {
      return res.status(400).json({
        success: false,
        message: "Appointment is already confirmed",
      });
    }
    appointment.appointmentStatus = "confirmed";
    await appointment.save();
    return res.status(200).json({
      success: true,
      message: "Appointment confirmed successfully",
      appointment,
    });
  } catch (error) {
    console.log("Error in confirmAppointment:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const cancelAppointment = async (req, res) => {
  try {
    const doctorId = req.user.id;
    const appointmentId = req.params.id;
    if (!appointmentId) {
      return res.status(400).json({
        success: false,
        message: "Appointment ID is required",
      });
    }
    // find appointment owned by doctor
    const appointment = await Appointment.findOne({
      _id: appointmentId,
      docId: doctorId,
    });
    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found or unauthorized",
      });
    }
    if (appointment.appointmentStatus === "cancelled") {
      return res.status(400).json({
        success: false,
        message: "Appointment is already cancelled",
      });
    }
    if (appointment.appointmentStatus === "confirmed") {
      return res.status(400).json({
        success: false,
        message: "Confirmed appointment cannot be cancelled",
      });
    }
    // handle payment status
    if (appointment.paymentStatus === "paid") {
      appointment.paymentStatus = "refunded"; // or pending_refund
    }
    appointment.appointmentStatus = "cancelled";
    await appointment.save();
    return res.status(200).json({
      success: true,
      message: "Appointment cancelled successfully",
      appointment,
    });
  } catch (error) {
    console.log("Error in confirmAppointment:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const doctorDashboard = async (req, res) => {
  try {
    const doctorId = req.user.id;
    if (!doctorId) {
      return res.status(400).json({
        success: false,
        message: "DoctorID is required",
      });
    }
    const appointments = await getDoctorAppointmentsById(doctorId);
    let earnings = 0;
    appointments.map((item) => {
      if (item.appointmentStatus !== "cancelled") {
        earnings += item.amount;
      }
    });
    let patients = [];
    appointments.map((item) => {
      if (!patients.includes(item.userId)) {
        patients.push(item.userId);
      }
    });
    const doctorDashboard = {
      earnings,
      appointmentsCount: appointments.length,
      patientsCount: patients.length,
      latestAppointments: appointments,
    };
    return res.status(200).json({
      success: true,
      message: "Doctor dashboard fetched successfully",
      doctorDashboard,
    });
  } catch (error) {
    console.log("Error in doctorDashboard:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getMyProfile = async (req, res) => {
  try {
    const doctorId = req.user.id;
    if (!doctorId) {
      return res.status(400).json({
        success: false,
        message: "DoctorID is required",
      });
    }
    const doctor = await getProfile(doctorId);
    if (!doctor) {
      return res.status(400).json({
        success: false,
        message: "DoctorID not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Doctor profile fetched successfully",
      doctor,
    });
  } catch (error) {
    console.log("Error in getMyProfile:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const updateMyProfile = async (req, res) => {
  try {
    const doctorId = req.user.id;
    if (!doctorId) {
      return res.status(400).json({
        success: false,
        message: "DoctorID is required",
      });
    }
    const doctor = await getProfile(doctorId);
    if (!doctor) {
      return res.status(400).json({
        success: false,
        message: "DoctorID not found",
      });
    }
    const updateData = req.body;
    if (!updateData) {
      return res.status(400).json({
        success: false,
        message: "please provide data to update",
      });
    }
    const updatedDoctor = await updateDoctor(doctorId, updateData);
    if (!updatedDoctor) {
      return res.status(400).json({
        success: false,
        message: "Doctor profile not updated",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Doctor profile updated successfully",
      doctor: updatedDoctor,
    });
  } catch (error) {
    console.log("Error in updateMyProfile:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
