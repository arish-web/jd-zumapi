import express from "express";
import {
  createAppointment,
  updateAppointment,
  getAppointmentsForUser,
  getAppointmentsForServiceOwner,
} from "../controllers/appointmentController.js";
import { verifyToken } from "../middleware/authMiddleware.js"; // optional if you use auth
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create a new appointment
router.post("/appointments", authenticate, createAppointment);
router.put("/appointments/:id/status", authenticate, updateAppointment);

// Get all appointments
// router.get("/", authenticate, getAllAppointments);
// routes/appointment.js (or .ts)
router.get("/appointmentuser", authenticate, getAppointmentsForUser);
router.get("/appointmentservice", authenticate, getAppointmentsForServiceOwner);

export default router;
