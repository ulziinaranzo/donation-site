import { Schema, model } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: false,
    default: "",
  },
  role: {
    type: String,
    enum: ["admin", "user"],
  },
  isVerified: {
    type: Boolean,
    required: false,
    default: "",
  },
  createdAt: {
    type: Date,
    required: true,
  },
  updatedAt: {
    type: Date,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
});

export const userModel = model("user", userSchema);
