export type FromTo = {
  start: string;
  end: string;
  active: boolean;
};

export type WeekdayName = 'lunes' | 'martes'
  | 'miércoles' | 'jueves' | 'viernes'
  | 'sábado' | 'domingo';

export type BookingTimes = {
  lunes: FromTo,
  martes: FromTo,
  miércoles: FromTo,
  jueves: FromTo,
  viernes: FromTo,
  sábado: FromTo,
  domingo: FromTo,
};