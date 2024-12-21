import { User } from "@clerk/nextjs/server";

export interface DataEvent {
  event: Event;
  user: User;
  formattedDate: string;
  selectedDate?: Date;
  hoursForSelectedDay: HoursSelectedDay;
  date?: string;
  time: number;
  days: Days[];
}

export interface Days {
  from: string;
  to: string;
  active: boolean;
  day: string;
  tots?: any;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  length: number;
  platform: Platform;
  presential: Presential;
}

export interface Platform {
  status: boolean;
  name: string;
}

export interface Presential {
  status: boolean;
  address: string;
}

export interface HoursSelectedDay {
  day: string;
  from: string;
  to: string;
  active: boolean;
}

export interface TimeTableProps {
  selectedDate?: Date;
  time: number;
  hoursForSelectedDay: HoursSelectedDay;
  eventId: string;
  date?: string;
  availableTimeSlots: string[];
}

export interface NylasCalendarData {
  requestId: string;
  data: FreeBusy[];
}

export interface FreeBusy {
  email: string;
  object: string;
  timeSlots: FreeBusyTimeSlot[];
}

export interface FreeBusyTimeSlot {
  startTime: number;
  endTime: number;
}

