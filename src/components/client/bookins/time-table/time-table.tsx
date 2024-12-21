"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import SelectTable from "./select-table";
import { TimeTableProps } from "../interfaces";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarIcon, Clock } from "lucide-react";

const TimeTable = ({
  selectedDate,
  time,
  eventId,
  date,
  availableTimeSlots,
}: TimeTableProps) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (selectedDate) {
      setIsLoading(true);

      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 200);

      return () => clearTimeout(timer);
    }
  }, [selectedDate]);

  if (availableTimeSlots.length === 0) {
    return (
      <Card className="w-full">
        <CardContent className="flex justify-center items-center h-32">
          <p className="text-muted-foreground">
            Selecciona una fecha para ver los horarios disponibles
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader className="bg-gray-100 mb-2">
        <CardTitle className="flex  items-center space-x-2">
          <Clock className="h-5 w-5" />
          <span>Selecciona horario</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          {format(selectedDate || new Date(), "EEEE, d 'de' MMMM 'de' yyyy", {
            locale: es,
          })}
        </p>
      </CardContent>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-8 w-3/4" />
          </div>
        ) : (
          <SelectTable
            eventId={eventId}
            hours={availableTimeSlots}
            meetingLength={time}
            date={date || ""}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default TimeTable;
