import express from "express";
import {
  addPhoto,
  getAllPhotos,
  getPhotoById,
  updatePhoto,
  softDeletePhoto,
} from "../controllers/PhotoController.js";
import { authenticate } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/authorizeMiddleware.js";



const router = express.Router();

router.post("/photos",authenticate,authorize(["photo"]), addPhoto);
router.get("/photos", getAllPhotos);
router.get("/photos/:id", getPhotoById);
router.put("/photos/:id",authenticate,authorize(["photo"]), updatePhoto);
router.patch("/photos/:id/delete",authenticate,authorize(["photo"]), softDeletePhoto);

export default router;
