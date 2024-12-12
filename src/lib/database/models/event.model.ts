import mongoose, { Model } from "mongoose";
import { BookingTimes, FromTo, WeekdayName } from "./types";

const FromToSchema = new mongoose.Schema({
  from: { type: String },
  to: { type: String },
  active: { type: Boolean },
});

export interface IEventType extends mongoose.Document {
  email: string;
  uri: string;
  title: string;
  description: string;
  length: number;
  bookingTimes: BookingTimes;
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema = new mongoose.Schema({
  lunes: { type: FromToSchema },
  martes: { type: FromToSchema },
  miércoles: { type: FromToSchema },
  jueves: { type: FromToSchema },
  viernes: { type: FromToSchema },
  sábado: { type: FromToSchema },
  domingo: { type: FromToSchema },
});

const EventTypeSchema = new mongoose.Schema<IEventType>(
  {
    email: String,
    uri: { type: String },
    title: String,
    description: String,
    length: Number,
    bookingTimes: BookingSchema,
  },
  {
    timestamps: true,
  }
);

export const EventTypeModel =
  (mongoose.models?.EventType as Model<IEventType>) ||
  mongoose.model<IEventType>("EventType", EventTypeSchema);
