import express from "express";
import {
  createAppointment,
  updateAppointment,
  getAppointmentsForUser,
  getAppointmentsForServiceOwner,
  markAppointmentAsPaid,
} from "../controllers/appointmentController.js";
import { verifyToken } from "../middleware/authMiddleware.js"; // optional if you use auth
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create a new appointment
router.post("/appointments", authenticate, createAppointment);
router.put("/appointments/:id/status", authenticate, updateAppointment);
router.patch("/appointments/:id/pay",authenticate, markAppointmentAsPaid);

// Get all appointments
router.get("/appointmentuser", authenticate, getAppointmentsForUser);
router.get("/appointmentservice", authenticate, getAppointmentsForServiceOwner);

export default router;
