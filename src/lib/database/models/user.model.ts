import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
  clerkId: {
    type: String,
    required: true,
    unique: true,
  },
  userName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  photo: {
    type: String,
    required: true,
  },
  phone: { type: String, required: true },
  gender: { type: String, default: "Not Selected" },
  dob: { type: String, default: "Not Selected" },
  password: { type: String, required: true },
});

const userModel = mongoose.models.user || mongoose.model("user", userSchema);
export default userModel;
