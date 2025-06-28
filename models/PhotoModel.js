// models/PhotoModel.js
import mongoose from "mongoose";

const PhotoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  photographer: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  // size: { type: String, required: true },
  date: { type: String, required: true },
  price: { type: Number, required: true },
  uniqueCode: { type: String, required: true, unique: true },
  image: { type: String, required: true }, // base64 or URL
  // createdBy: { type: String, required: true }, // userId
  ownerId: { type: String, required: true},
  deleted: { type: Boolean, default: false },
});

const Photo = mongoose.model("photo", PhotoSchema);
export default Photo;
