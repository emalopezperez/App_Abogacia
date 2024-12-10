export type DaySchedule = {
  enabled: boolean;
  start: string;
  end: string;
};

export type ScheduleState = {
  time: number;
  gap: number;
  general: {
    start: string;
    end: string;
  };
  days: Record<string, DaySchedule>;
};


export interface Schedule {
  enabled: boolean;
  start: string;
  end: string;
}