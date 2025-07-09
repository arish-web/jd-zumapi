import { Appointment } from "../models/AppoinmentModel.js";
import Photo from "../models/PhotoModel.js";
import Tattoo from "../models/TattooModel.js";
import User from "../models/authModel.js";

export const createAppointment = async (req, res) => {
  try {
    const { serviceId, serviceType, date, time } = req.body;
    const userId = req.user.id;

    let ownerId;
    let actualServiceId; // Store the ObjectId here

    if (serviceType === "tattoo") {
      const tattoo =
        typeof serviceId === "object"
          ? await Tattoo.findOne(serviceId)
          : await Tattoo.findById(serviceId);

      if (!tattoo) {
        return res.status(404).json({ message: "Tattoo service not found" });
      }

      ownerId = tattoo.ownerId;
      actualServiceId = tattoo._id;
    }

    if (serviceType === "photo") {
      const photo =
        typeof serviceId === "object"
          ? await Photo.findOne(serviceId)
          : await Photo.findById(serviceId);

      if (!photo) {
        return res.status(404).json({ message: "Photo service not found" });
      }

      ownerId = photo.ownerId;
      actualServiceId = photo._id;
    }

    const appointment = new Appointment({
      userId,
      serviceId: actualServiceId, // ✅ Set correct ObjectId
      serviceType,
      date,
      time,
      ownerId,
      status: "pending",
    });

    const saved = await appointment.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("Failed to create appointment:", err);
    res
      .status(500)
      .json({ error: "Failed to create appointment", details: err });
  }
};

export const markAppointmentAsPaid = async (req, res) => {
  const { id } = req.params;

  try {
    await Appointment.findByIdAndUpdate(id, { paymentStatus: "Paid" });
    res.status(200).json({ message: "Payment marked successfully" });
  } catch (err) {
    console.error("Error updating payment status:", err);
    res.status(500).json({ error: "Failed to mark payment" });
  }
};

// export const markAppointmentAsPaid = async (req, res) => {
//   try {
//     const user = req.user;

//     if (user.role !== "admin" && user.role !== "owner") {
//       return res.status(403).json({ message: "Forbidden" });
//     }

//     const appointmentId = req.params.id;

//     const updated = await Appointment.findByIdAndUpdate(
//       appointmentId,
//       { paymentStatus: "Paid" },
//       { new: true }
//     );

//     if (!updated) {
//       return res.status(404).json({ message: "Appointment not found" });
//     }

//     res.status(200).json({ message: "Payment status updated", data: updated });
//   } catch (error) {
//     console.error("Error marking as paid:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

export const updateAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Optional: validate allowed statuses
    const allowedStatuses = ["pending", "confirmed", "cancelled", "accepted"];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const updatedAppointment = await Appointment.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedAppointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    console.log("updatedAppointment", updatedAppointment);

    res.json(updatedAppointment);
  } catch (err) {
    console.error("Error updating appointment status:", err);
    res.status(500).json({ message: "Failed to update status" });
  }
};

export const getAppointmentsForUser = async (req, res) => {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }

  try {
    const appointments = await Appointment.find({ userId })
      .populate("userId", "name")
      .populate("serviceId", "title category price");

    res.json(appointments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error fetching appointments" });
  }
};

// Get All
export const getAppointmentsForServiceOwner = async (req, res) => {
  try {
    const ownerId = req.user.id;

    // 1. Get services created by this owner
    const tattooServices = await Tattoo.find({ ownerId }).select("_id");
    const photoServices = await Photo.find({ ownerId }).select("_id");

    const serviceIds = [
      ...tattooServices.map((t) => t._id),
      ...photoServices.map((p) => p._id),
    ];

    // 2. Get appointments matching any of these services
    const appointments = await Appointment.find({
      serviceId: { $in: serviceIds },
    })
      .populate("userId", "name email") // or clientId if that’s your schema
      .populate("serviceId", "title category");

    res.status(200).json(appointments);
  } catch (err) {
    console.error("Error fetching appointments:", err);
    res
      .status(500)
      .json({ message: "Server error while fetching appointments" });
  }
};
