import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    clerkId: {
      type: String,
      required: true,
      unique: true,
    },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: { type: String, required: true },
    about: { type: String, required: true },
    available: { type: Boolean, default: true },
    slots_booked: { type: Object, default: {} },
    date: { type: Number, required: true },
  },
  { minimize: false }
);

const adminModel =
  mongoose.models.admin || mongoose.model("admin", adminSchema);
export default adminModel;
