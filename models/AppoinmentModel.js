import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "serviceType",
      required: true,
    },
    serviceType: { type: String, enum: ["tattoo", "photo"], required: true },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled", "accepted"],
      default: "pending",
    },
    paymentStatus: {
      type: String,
      enum: ["Unpaid", "Paid"],
      default: "Unpaid",
    },
  },
  { timestamps: true }
);

export const Appointment = mongoose.model("Appointment", appointmentSchema);
