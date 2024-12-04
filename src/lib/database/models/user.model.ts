import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  clerkUserId: {
    type: String,
    required: true,
    unique: true,
  },
  userName: { type: String },
  email: { type: String, required: true, unique: true },
  image: { type: String },
  phone: { type: String },
});

const userModel = mongoose.models.user || mongoose.model("user", userSchema);
export default userModel;
