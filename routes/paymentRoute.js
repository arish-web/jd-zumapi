import express from "express";
import { createOrder } from "../controllers/paymentController.js";
import { authenticate } from "../middleware/authMiddleware.js";


const router = express.Router();

router.post("/payment/create-order",authenticate, createOrder);

export default router;
