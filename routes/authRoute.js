import express from 'express';
import { verifyToken } from '../middleware/authMiddleware.js'
import { authenticate } from "../middleware/authMiddleware.js";
import { registerUser } from '../controllers/authController.js';
import { loginUser } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/auth/login', loginUser);

export default router;
