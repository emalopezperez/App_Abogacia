
import mongoose, {Model} from 'mongoose';
import { BookingTimes, FromTo, WeekdayName } from './types';

const FromToSchema = new mongoose.Schema({
  start: String,
  end: String,
  active: Boolean,
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

const BookingSchema = new mongoose.Schema<Record<WeekdayName, FromTo>>({
  lunes: FromToSchema,
  martes: FromToSchema,
  miércoles: FromToSchema,
  jueves: FromToSchema,
  viernes: FromToSchema,
  sábado: FromToSchema,
  domingo: FromToSchema,
});

const EventTypeSchema = new mongoose.Schema<IEventType>({
  email: String,
  uri: {type: String},
  title: String,
  description: String,
  length: Number,
  bookingTimes: BookingSchema,
}, {
  timestamps: true,
});

export const EventTypeModel = mongoose.models?.EventType as Model<IEventType> || mongoose.model<IEventType>('EventType', EventTypeSchema);