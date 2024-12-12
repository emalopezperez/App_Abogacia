"use client";

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
import { motion } from "framer-motion";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { days, hours } from "@/constants";
import { Schedule } from "./types/types-event";

interface AvailabilityDaysProps {
  setSchedules: React.Dispatch<React.SetStateAction<Record<string, Schedule>>>;
  schedules: Record<string, Schedule>;
}

export function AvailabilityDays({
  setSchedules,
  schedules,
}: AvailabilityDaysProps) {
  const handleSwitchChange = (day: string) => {
    setSchedules((prev) => {
      const isActive = !prev[day].active;

      return {
        ...prev,
        [day]: {
          ...prev[day],
          active: isActive,
          from: isActive ? prev[day].from || "09:00" : "",
          to: isActive ? prev[day].to || "17:00" : "",
        },
      };
    });
  };

  const handleTimeChange = (
    day: string,
    type: "from" | "to",
    value: string
  ) => {
    setSchedules((prev) => {
      const updatedSchedule = { ...prev[day], [type]: value };

      if (type === "from" && value >= prev[day].to) {
        updatedSchedule.to = hours.find((hour) => hour > value) || value;
      }

      if (type === "to" && value <= prev[day].from) {
        updatedSchedule.from = hours.find((hour) => hour < value) || value;
      }

      return { ...prev, [day]: updatedSchedule };
    });
  };

  return (
    <Card className="w-full shadow-xl">
      <motion.div
        className="overflow-hidden pb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}>
        <div className="overflow-x-auto">
          <CardHeader className="mb-4">
            <CardTitle className="text-xl font-semibold">
              Establecer Disponibilidad
            </CardTitle>
            <CardDescription>
              Establecer la disponibilidad de los eventos
            </CardDescription>
          </CardHeader>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/6 text-center">Habilitar</TableHead>
                <TableHead className="w-1/6 text-center">Días</TableHead>
                <TableHead className="w-1/3 text-center">Inicio</TableHead>
                <TableHead className="w-1/3 text-center">Fin</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {days.map((day, index) => (
                <motion.tr
                  key={day}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}>
                  <TableCell className="text-center align-middle py-2">
                    <Switch
                      checked={schedules[day]?.active || false}
                      onCheckedChange={() => handleSwitchChange(day)}
                    />
                  </TableCell>
                  <TableCell className="text-center font-medium align-middle py-2">
                    {day}
                  </TableCell>
                  <TableCell className="text-center align-middle py-2">
                    <Select
                      value={schedules[day]?.from || ""}
                      onValueChange={(value) =>
                        handleTimeChange(day, "from", value)
                      }
                      disabled={!schedules[day]?.active}>
                      <SelectTrigger className="w-full max-w-[120px] mx-auto">
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
                  <TableCell className="text-center align-middle py-2">
                    <Select
                      value={schedules[day]?.to || ""}
                      onValueChange={(value) =>
                        handleTimeChange(day, "to", value)
                      }
                      disabled={!schedules[day]?.active}>
                      <SelectTrigger className="w-full max-w-[120px] mx-auto">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {hours
                            .filter((hour) => hour > schedules[day]?.from)
                            .map((hour) => (
                              <SelectItem key={hour} value={hour}>
                                {hour}
                              </SelectItem>
                            ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </TableCell>
                </motion.tr>
              ))}
            </TableBody>
          </Table>
        </div>
      </motion.div>
    </Card>
  );
}
