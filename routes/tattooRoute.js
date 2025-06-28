import express from "express";
import { addTattoo, getAllTattoos, updateTattoo, softDeleteTattoo, getTattooById } from "../controllers/tattooController.js";
import { authenticate } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/authorizeMiddleware.js";

const router = express.Router();

router.post("/tattoos",authenticate,authorize(["tattoo"]), addTattoo); 
router.get("/tattoos", getAllTattoos);
router.get("/tattoos/:id", getTattooById);
// router.get("/tattoos",authenticate, getAllTattoos);
// router.get("/tattoos/:id", authenticate, getTattooById);
router.put("/tattoos/:id", authenticate,authorize(["tattoo"]), updateTattoo);
router.patch('/tattoos/:id/delete', authenticate,authorize(["tattoo"]), softDeleteTattoo);


export default router;
