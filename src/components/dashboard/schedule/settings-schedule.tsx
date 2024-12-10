"use client";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { addMinutes, parse, format } from "date-fns";
import TableSchedule from "./table-schedule";
import { generateTimeOptions } from "@/constants";

const days = [
  "LUNES",
  "MARTES",
  "MIÉRCOLES",
  "JUEVES",
  "VIERNES",
  "SÁBADO",
  "DOMINGO",
];

const generateTimeOptions = (startHour: number, endHour: number) => {
  const times = [];
  for (let hour = startHour; hour <= endHour; hour++) {
    times.push(`${hour.toString().padStart(2, "0")}:00`);
  }
  return times;
};

export function SettingSchedule() {
  const [appointments, setAppointments] = useState([]);
  const [schedule, setSchedule] = useState({
    sessionDuration: 60,
    gap: 10,
    general: { start: "08:00", end: "" },
    lunch: undefined,
    days: days.reduce((acc, day) => {
      acc[day] = { enabled: true, start: "08:00", end: "" };
      return acc;
    }, {}),
  });

  const handleGeneralTimeChange = (key: "start" | "end", value: string) => {
    setSchedule((prev) => ({
      ...prev,
      general: {
        ...prev.general,
        [key]: value,
      },
      days: Object.keys(prev.days).reduce((acc, day) => {
        acc[day] = {
          ...prev.days[day],
          [key]: value,
        };
        return acc;
      }, {}),
    }));
  };

  const handleSessionDuration = (value: number) => {
    setSchedule((prev) => ({
      ...prev,
      sessionDuration: value,
    }));
  };

  const handleGapChange = (value: number) => {
    setSchedule((prev) => ({
      ...prev,
      gap: value,
    }));
  };

  const handleDayTimeChange = (
    day: string,
    key: "start" | "end",
    value: string
  ) => {
    setSchedule((prev) => ({
      ...prev,
      days: {
        ...prev.days,
        [day]: {
          ...prev.days[day],
          [key]: value,
        },
      },
    }));
  };

  const generateAppointments = () => {
    let startTime = parse(schedule.general.start, "HH:mm", new Date());
    const sessionTime = schedule.sessionDuration + schedule.gap;

    let currentTime = startTime;
    const maxAppointments = 11;
    let appointmentsArray = [];

    for (let i = 0; i < maxAppointments; i++) {
      const formattedTime = format(currentTime, "HH:mm");
      appointmentsArray.push({ time: formattedTime, type: "Available" });
      currentTime = addMinutes(currentTime, sessionTime);
    }

    setAppointments(appointmentsArray);
  };

  const generateHoursEnd = (time, meetingsCount) => {
    let startTime = parse(time, "HH:mm", new Date());
    const sessionTime = schedule.sessionDuration + schedule.gap;

    let currentTime = startTime;
    const maxAppointments = meetingsCount;
    let hoursEnd = [];

    for (let i = 0; i < maxAppointments; i++) {
      const formattedTime = format(currentTime, "HH:mm");
      hoursEnd.push(formattedTime);
      currentTime = addMinutes(currentTime, sessionTime);
    }

    console.log(hoursEnd);
  };

  const markLunchAsOccupied = (lunchTime) => {
    const updatedAppointments = appointments.map((appointment) =>
      appointment.time === lunchTime
        ? { ...appointment, type: "Lunch" }
        : appointment
    );
    setAppointments(updatedAppointments);

    setSchedule((prev) => ({
      ...prev,
      lunch: lunchTime,
    }));
  };

  const markAsOccupied = (occupiedTime) => {
    const updatedAppointments = appointments.map((appointment) =>
      appointment.time === occupiedTime
        ? { ...appointment, type: "Busy" }
        : appointment
    );
    setAppointments(updatedAppointments);
  };

  useEffect(() => {
    if (schedule.general.start) {
      return generateAppointments();
    }
  }, [
    schedule.general.start,
    schedule.sessionDuration,
    schedule.gap,
    schedule.general.end,
  ]);

  // console.log(schedule.days);

  return (
    <div className="mt-6 ">
      <div className=" p-4 border border-gray-300 rounded-lg shadow-sm">
        <p className="mb-4 text-gray-600">
          Configura el horario general y ajusta los días según sea necesario. Si
          deshabilitas un día, este no estará disponible.
        </p>

        <h3 className="text-xl font-semibold mb-4">Horario General</h3>
        <div className="flex flex-col lg:flex-row gap-6 lg:items-center">
          {/* Inputs generales de Duración, Gap, Inicio y Fin */}
          {/* Duración */}
          <div>
            <label className="block mb-2">Duración</label>
            <Select
              onValueChange={(value) => handleSessionDuration(parseInt(value))}
              value={String(schedule.sessionDuration)}>
              <SelectTrigger className="w-52">
                <SelectValue placeholder="Seleccionar" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Time</SelectLabel>
                  <SelectItem value="30">30 minutos</SelectItem>
                  <SelectItem value="45">45 minutos</SelectItem>
                  <SelectItem value="60">1 hora</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Gap */}
          <div>
            <label className="block mb-2">Gap</label>
            <Select
              onValueChange={(value) => handleGapChange(parseInt(value))}
              value={String(schedule.gap)}
              disabled={!schedule.sessionDuration}>
              <SelectTrigger className="w-52">
                <SelectValue placeholder="Seleccionar" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Gap</SelectLabel>
                  <SelectItem value="0">0 minutos</SelectItem>
                  <SelectItem value="10">10 minutos</SelectItem>
                  <SelectItem value="15">15 minutos</SelectItem>
                  <SelectItem value="30">30 minutos</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Horario de inicio */}
          <div>
            <label className="block mb-2">Inicio:</label>
            <Select
              onValueChange={(value) => handleGeneralTimeChange("start", value)}
              value={schedule.general.start}
              disabled={!schedule.sessionDuration}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Horario</SelectLabel>
                  {generateTimeOptions(7, 10).map((time) => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Horario de fin */}
          <div>
            <label className="block mb-2">Fin:</label>
            <Select
              onValueChange={(value) => handleGeneralTimeChange("end", value)}
              value={schedule.general.end}
              disabled={!schedule.sessionDuration}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Horario</SelectLabel>
                  {appointments?.slice(3).map((element, index) => (
                    <SelectItem key={index} value={element.time}>
                      {element.time}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Configuración de días */}
        <div className="mt-6">
          <h4 className="text-lg font-semibold mb-4">Configuración de Días</h4>
          {days.map((day) => (
            <div key={day} className="flex items-center gap-6 mb-4">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={schedule.days[day].enabled}
                  onChange={() => {
                    setSchedule((prev) => ({
                      ...prev,
                      days: {
                        ...prev.days,
                        [day]: {
                          ...prev.days[day],
                          enabled: !prev.days[day].enabled,
                        },
                      },
                    }));
                  }}
                />
                <label>{day}</label>
              </div>

              {schedule.days[day].enabled && (
                <>
                  <Select
                    onValueChange={(value) =>
                      handleDayTimeChange(day, "start", value)
                    }
                    value={schedule.days[day].start}>
                    <SelectTrigger>
                      <SelectValue placeholder="Inicio" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Inicio</SelectLabel>
                        {generateTimeOptions(7, 10).map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>

                  <Select
                    onValueChange={(value) =>
                      handleDayTimeChange(day, "end", value)
                    }
                    value={schedule.days[day].end}>
                    <SelectTrigger>
                      <SelectValue placeholder="Fin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Fin</SelectLabel>
                        {appointments?.slice(3).map((element, index) => (
                          <SelectItem key={index} value={element.time}>
                            {element.time}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
