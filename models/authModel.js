import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['tattoo', 'photo', 'client'],
      required: true,
    },
    company: {
      type: String,
      default: null,
    },
    isDeleted: {
      type: Boolean,
      default: false, // For soft delete
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);
export default User;

