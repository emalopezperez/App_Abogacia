import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
  clerkUserId: { type: String, required: true, unique: true, index: true },
  email: { type: String, required: true, unique: true, index: true },
  name: { type: String, required: true },
  imageUrl: { type: String },
  availability: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Availability",
    },
  ],
  phone: { type: String },
  nylasGrantId: { type: String },
  nylasEmail: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const Admin =
  mongoose.models.Admin ||
  mongoose.model("Admin", AdminSchema);