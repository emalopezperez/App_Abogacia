

export interface Schedule {
  active: boolean;
  from: string;
  to: string;
}

export interface CardEventsType {
  _id: string;
  uri: string;
  title: string;
  description: string;
  length: number;
  bookingTimes: [];
}