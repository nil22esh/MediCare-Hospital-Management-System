import { getDoctorById } from "../services/doctor.service.js";
import {
  checkUserExists,
  createAppointment,
  createUser,
  findUserById,
  updateUserById,
} from "../services/user.service.js";
import Doctor from "../models/doctor.model.js";
import {
  findAppointmentsById,
  findAppointmentsByUserId,
  validateAppointment,
} from "../services/appointment.service.js";
import Appointment from "../models/appointment.model.js";
import razorpayInstance from "../configs/razorpayConfig.js";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, phone, image, address, gender, dob, role } =
      req.body;
    // Check if user already exists
    const existingUser = await checkUserExists(email, phone);
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User with this email or phone number already exists",
      });
    }
    // Create new user
    const newUser = await createUser({
      name,
      email,
      password,
      phone,
      image,
      address,
      gender,
      dob,
      role,
    });
    const userToken = newUser.jwtToken();
    res.cookie("userToken", userToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: "strict",
    });
    // Remove sensitive fields before sending
    const { password: _, ...userWithoutPassword } = newUser._doc;
    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      userToken,
      user: userWithoutPassword,
    });
  } catch (error) {
    console.log("Error in registerUser:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExists = await checkUserExists(email);
    if (!userExists) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }
    const isPasswordValid = await userExists.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }
    const userToken = userExists.jwtToken();
    res.cookie("userToken", userToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: "strict",
    });
    // Remove sensitive fields before sending
    const { password: _, ...userWithoutPassword } = userExists._doc;
    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
      userToken,
      user: userWithoutPassword,
    });
  } catch (error) {
    console.log("Error in loginUser:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }
    const userData = await findUserById(userId);
    if (!userData) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "User details fetched",
      userData,
    });
  } catch (error) {
    console.log("Error in getUserProfile:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const { name, phone, address, gender, dob } = req.body;
    const userId = req.user.id;
    const imageFile = req.file;
    const parsedAddress = address ? JSON.parse(address) : {};
    const updatedUser = await updateUserById({
      userId,
      name,
      phone,
      address: parsedAddress,
      gender,
      dob,
      imageFile,
    });
    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      updatedUser,
    });
  } catch (error) {
    console.log("Error in updateUserProfile:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const bookAppointment = async (req, res) => {
  try {
    const { docId, slotDate, slotTime, notes } = req.body;
    const userId = req.user.id;
    const docData = await getDoctorById(docId);
    if (!docData) {
      return res.status(400).json({
        success: false,
        message: "doctor not found",
      });
    }
    if (!docData.available) {
      return res.status(400).json({
        success: false,
        message: "doctor not available",
      });
    }
    let slots_booked = { ...docData.slots_booked };
    // Check slot availability
    if (!slots_booked[slotDate]) {
      slots_booked[slotDate] = [];
    }
    if (slots_booked[slotDate].includes(slotTime)) {
      return res.status(400).json({
        success: false,
        message: "Time slot not available, please choose another time",
      });
    }
    // Book the slot
    slots_booked[slotDate].push(slotTime);
    const userData = await findUserById(userId);
    if (!userData) {
      return res.status(400).json({
        success: false,
        message: "user not found",
      });
    }
    const newAppointment = await createAppointment({
      userId,
      docId,
      slotDate,
      slotTime,
      userData,
      docData,
      amount: docData.fees,
      notes,
    });
    if (!newAppointment) {
      return res.status(400).json({
        success: false,
        message: "Appointment booking failed",
      });
    }
    await Doctor.findByIdAndUpdate(docId, { slots_booked });
    return res.status(201).json({
      success: true,
      message: "Appointment booked successfully",
      newAppointment,
    });
  } catch (error) {
    console.log("Error in bookAppointment:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const userAppointmentsList = async (req, res) => {
  try {
    const userId = req.user.id;
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "user id is required",
      });
    }
    const userData = await findUserById(userId);
    if (!userData) {
      return res.status(400).json({
        success: false,
        message: "user not found",
      });
    }
    const appointments = await findAppointmentsByUserId(userId);
    if (appointments.length === 0) {
      return res.status(200).json({
        success: true,
        message: "You haven't booked any appointment yet",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Appointments fetched successfully",
      count: appointments.length,
      appointments,
    });
  } catch (error) {
    console.log("Error in myAppointmentList:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const cancelAppointment = async (req, res) => {
  try {
    const userId = req.user.id;
    const appointmentId = req.params.id;
    if (!userId || !appointmentId) {
      return res.status(400).json({
        success: false,
        message: "UserId and AppointmentId are required.",
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
    // user authorization check
    if (String(appointment.userId) !== String(userId)) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to cancel this appointment.",
      });
    }
    if (appointment.paymentStatus === "paid") {
      // cancel appointment
      await Appointment.findByIdAndUpdate(
        appointmentId,
        { appointmentStatus: "cancelled", paymentStatus: "failed" },
        { new: true }
      );
    }
    // cancel appointment
    await Appointment.findByIdAndUpdate(
      appointmentId,
      { appointmentStatus: "cancelled" },
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
      await Doctor.findByIdAndUpdate(
        docId,
        { slots_booked: slotsBooked },
        { new: true }
      );
    }
    return res.status(200).json({
      success: true,
      message: "Appointment cancelled successfully.",
      appointment,
    });
  } catch (error) {
    console.log("Error in cancelAppointment:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const razorpayPaymentAppointment = async (req, res) => {
  try {
    const appointmentId = req.params.id;
    const appointment = await validateAppointment(appointmentId, res);
    if (!appointment) return;
    // razorpay payment integration with options
    const order = await razorpayInstance.orders.create({
      amount: appointment.amount * 100,
      currency: process.env.RAZORPAY_CURRENCY || "INR",
      receipt: `receipt_order_${appointmentId}`,
    });
    return res.status(200).json({
      success: true,
      message: "Razorpay order created successfully",
      order,
    });
  } catch (error) {
    console.error("Razorpay Order Error:", error);
    return res.status(200).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const verifyAppointmentPayment = async (req, res) => {
  try {
    const { razorpay_order_id } = req.body;
    // verify payment signature
    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);
    if (!orderInfo) {
      return res.status(404).json({
        success: false,
        message: "Payment order not found",
      });
    }
    if (orderInfo.status !== "paid") {
      return res.status(400).json({
        success: false,
        message: "Payment verification failed",
      });
    }
    // safe receipt extraction: "receipt_order_64c98ae01f1..." → ID
    const receiptParts = orderInfo.receipt?.split("_");
    const appointmentId = receiptParts?.[2];
    if (!appointmentId) {
      return res.status(400).json({
        success: false,
        message: "Invalid receipt format",
      });
    }
    const appointment = await validateAppointment(appointmentId, res);
    if (!appointment) return;
    await Appointment.findByIdAndUpdate(
      appointmentId,
      { paymentStatus: "paid" },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: "payment verified successfully",
      orderInfo,
    });
  } catch (error) {
    return res.status(200).json({
      success: false,
      message: "Internal server error",
    });
  }
};
