import Appointment from "../models/appointment.model.js";
import User from "../models/user.model.js";
import { v2 as cloudinary } from "cloudinary";

export const checkUserExists = async (email, phone) => {
  try {
    const existingUser = await User.findOne({
      $or: [{ email: email }, { phone: phone }],
    });
    return existingUser;
  } catch (error) {
    console.log("Error in checkUserExists:", error);
    throw error;
  }
};

export const createUser = async (userData) => {
  try {
    const user = new User(userData);
    await user.save();
    return user;
  } catch (error) {
    console.log("Error in createUser:", error);
    throw error;
  }
};

export const findUserById = async (userId) => {
  try {
    const user = await User.findById(userId).select("-password");
    return user;
  } catch (error) {
    console.log("Error in findUserById:", error);
    throw error;
  }
};

export const updateUserById = async ({
  userId,
  name,
  phone,
  address,
  gender,
  dob,
  imageFile,
}) => {
  try {
    const updateData = {
      name,
      phone,
      address,
      gender,
      dob,
    };
    // Upload image if provided
    if (imageFile) {
      const uploaded = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });
      // Save URL
      updateData.image = uploaded.secure_url;
    }
    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
    }).select("-password");
    // Return updated user
    return updatedUser;
  } catch (error) {
    console.log("Error in updateUserById:", error);
    throw error;
  }
};

export const createAppointment = async (appointmentData) => {
  try {
    const {
      userId,
      docId,
      slotDate,
      slotTime,
      userData,
      docData,
      amount,
      date,
      notes,
    } = appointmentData;
    const appointment = new Appointment({
      userId,
      docId,
      slotDate,
      slotTime,
      userData,
      docData,
      amount,
      date,
      notes,
    });
    await appointment.save();
    return appointment;
  } catch (error) {
    console.log("Error in createAppointment:", error);
    throw error;
  }
};

export const getAllUsers = async () => {
  try {
    const users = await User.find().select("-password");
    return users;
  } catch (error) {
    console.log("Error in getAllUsers:", error);
    throw error;
  }
};
