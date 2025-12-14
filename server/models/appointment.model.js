import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    docId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
    },
    slotDate: {
      type: String,
      required: true,
    },
    slotTime: {
      type: String,
      required: true,
    },
    userData: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
    docData: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    appointmentStatus: {
      type: String,
      enum: ["pending", "confirmed", "cancelled", "completed"],
      default: "pending",
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "success", "failed"],
      default: "pending",
    },
    notes: {
      type: String,
      default: "",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Appointment = mongoose.model("Appointment", appointmentSchema);
export default Appointment;
