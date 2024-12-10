import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    clerkUserId: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, required: true, unique: true },
    avatar: { type: String },
    phone: { type: String },
    createdAt: { type: Date },
    lastActiveAt: { type: Date },
  },
  {
    autoIndex: false,
  }
);

const userModel = mongoose.models.user || mongoose.model("user", userSchema);
export default userModel;
