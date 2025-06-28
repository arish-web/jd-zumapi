import { Appointment } from "../models/AppoinmentModel.js";
import Photo from "../models/PhotoModel.js";
import Tattoo from "../models/TattooModel.js";
import User from "../models/authModel.js";

// export const createAppointment = async (req, res) => {
//   try {
//     const { serviceId, serviceType, date, time } = req.body;
//     const userId = req.user.id;

//     let ownerId;

//     if (serviceType === "tattoo") {
//       const tattoo = await Tattoo.findById(serviceId);
//       if (!tattoo) {
//         return res.status(404).json({ message: "Tattoo service not found" });
//       }
//       ownerId = tattoo.ownerId;
//     }

//     // if (serviceType === "photo") {
//     //   const photo = await Photo.findById(serviceId);
//     //   if (!photo) {
//     //     return res.status(404).json({ message: "Photo service not found" });
//     //   }
//     //   ownerId = photo.ownerId;
//     // }
//     if (serviceType === "photo") {
//       let photo;

//       if (typeof serviceId === "object" && serviceId.title) {
//         // Search by title or any other field in the object
//         photo = await Photo.findOne({ title: serviceId.title });
//       } else {
//         // Search by ObjectId string
//         photo = await Photo.findById(serviceId);
//       }

//       if (!photo) {
//         return res.status(404).json({ message: "Photo service not found" });
//       }

//       ownerId = photo.ownerId;
//     }

//     const appointment = new Appointment({
//       userId,
//       serviceId,
//       serviceType,
//       date,
//       time,
//       ownerId, // ✅ now correctly derived
//       status: "pending",
//     });

//     const saved = await appointment.save();
//     res.status(201).json(saved);
//   } catch (err) {
//     console.error("Failed to create appointment:", err);
//     res
//       .status(500)
//       .json({ error: "Failed to create appointment", details: err });
//   }
// };

// Get All




export const createAppointment = async (req, res) => {
  try {
    const { serviceId, serviceType, date, time } = req.body;
    const userId = req.user.id;

    let ownerId;
    let actualServiceId; // Store the ObjectId here

    if (serviceType === "tattoo") {
      const tattoo = typeof serviceId === "object"
        ? await Tattoo.findOne(serviceId)
        : await Tattoo.findById(serviceId);

      if (!tattoo) {
        return res.status(404).json({ message: "Tattoo service not found" });
      }

      ownerId = tattoo.ownerId;
      actualServiceId = tattoo._id;
    }

    if (serviceType === "photo") {
      const photo = typeof serviceId === "object"
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
    res.status(500).json({ error: "Failed to create appointment", details: err });
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
      .populate("serviceId", "title category");

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
