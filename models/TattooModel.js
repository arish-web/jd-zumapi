import mongoose from "mongoose";

const TattooSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  artist: { type: String, required: true }, // filled from req.user
  style: { type: String, required: true },
  category: { type: String, required: true },
  date: { type: String, required: true },
  price: { type: String, required: true },
  uniqueCode: { type: String, required: true, unique: true },
  image: { type: String }, // you can also use Buffer if storing as file
  ownerId: { type: String, required: true},
  deleted: { type: Boolean, default: false },
}, { timestamps: true });

const Tattoo = mongoose.model("tattoo", TattooSchema);
export default Tattoo;

