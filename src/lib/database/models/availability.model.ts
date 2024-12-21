import mongoose from "mongoose";

const AvailabilitySchema = new mongoose.Schema(
  {
    adminId: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
    day: {
      type: String,
      enum: [
        "Lunes",
        "Martes",
        "Miercoles",
        "Jueves",
        "Viernes",
        "Sabado",
        "Domingo",
      ],
      required: true,
    },
    fromTime: { type: String, required: true },
    toTime: { type: String, required: true },
    isActive: { type: Boolean, required: true },
  },
  { timestamps: true }
);

export const Availability =
  mongoose.models.Availability ||
  mongoose.model("Availability", AvailabilitySchema);
