"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const days = [
  "LUNES",
  "MARTES",
  "MIÉRCOLES",
  "JUEVES",
  "VIERNES",
  "SÁBADO",
  "DOMINGO",
];

const hours = Array.from({ length: 24 }, (_, i) => i)
  .map((hour) => [
    `${hour.toString().padStart(2, "0")}:00`,
    `${hour.toString().padStart(2, "0")}:30`,
  ])
  .flat();

interface Schedule {
  enabled: boolean;
  start: string;
  end: string;
}

const TableSchedule = () => {
  const [schedules, setSchedules] = useState<Record<string, Schedule>>(
    days.reduce(
      (acc, day) => ({
        ...acc,
        [day]: { enabled: true, start: "09:00", end: "17:00" },
      }),
      {}
    )
  );

  const handleSwitchChange = (day: string) => {
    setSchedules((prev) => ({
      ...prev,
      [day]: { ...prev[day], enabled: !prev[day].enabled },
    }));
  };

  const handleTimeChange = (
    day: string,
    type: "start" | "end",
    value: string
  ) => {
    setSchedules((prev) => ({
      ...prev,
      [day]: { ...prev[day], [type]: value },
    }));
  };

  return (
    <div className="w-full max-w-4xl mx-auto rounded-lg overflow-hidden border border-gray-200 shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead className="text-center font-semibold">
              Habilitar
            </TableHead>
            <TableHead className="text-center font-semibold">Días</TableHead>
            <TableHead className="text-center font-semibold">Inicio</TableHead>
            <TableHead className="text-center font-semibold">Fin</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {days.map((day) => (
            <TableRow key={day} className="hover:bg-gray-50">
              <TableCell className="text-center">
                <Switch
                  checked={schedules[day].enabled}
                  onCheckedChange={() => handleSwitchChange(day)}
                />
              </TableCell>
              <TableCell className="text-center font-medium">{day}</TableCell>
              <TableCell className="text-center">
                <Select
                  value={schedules[day].start}
                  onValueChange={(value) =>
                    handleTimeChange(day, "start", value)
                  }
                  disabled={!schedules[day].enabled}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {hours.map((hour) => (
                        <SelectItem key={hour} value={hour}>
                          {hour}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell className="text-center">
                <Select
                  value={schedules[day].end}
                  onValueChange={(value) => handleTimeChange(day, "end", value)}
                  disabled={!schedules[day].enabled}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {hours
                        .filter((hour) => hour > schedules[day].start)
                        .map((hour) => (
                          <SelectItem key={hour} value={hour}>
                            {hour}
                          </SelectItem>
                        ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TableSchedule;
