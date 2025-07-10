import express from 'express';
import { verifyToken } from '../middleware/authMiddleware.js'
import { authenticate } from "../middleware/authMiddleware.js";
import { registerUser } from '../controllers/authController.js';
import { loginUser } from '../controllers/authController.js';
import { forgotPassword } from '../controllers/authController.js';
import { resetPassword } from "../controllers/authController.js";

const router = express.Router();

router.post('/register', registerUser);
router.post('/auth/login', loginUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

export default router;
