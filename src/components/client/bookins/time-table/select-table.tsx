"use client";

import { useState } from "react";
import { createBooking } from "@/app/actions/admin.actions";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectLabel,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Clock, MessageSquare } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface SelectTableProps {
  hours: string[];
  date: string;
  meetingLength: number;
  eventId: string;
}

const groupHoursByTimeFrame = (hours: string[], frameSize: number = 4) => {
  return hours.reduce((acc, hour, index) => {
    const frameIndex = Math.floor(index / frameSize);
    if (!acc[frameIndex]) {
      acc[frameIndex] = [];
    }
    acc[frameIndex].push(hour);
    return acc;
  }, [] as string[][]);
};

const SelectTable = ({
  hours,
  date,
  meetingLength,
  eventId,
}: SelectTableProps) => {
  const [selectedHour, setSelectedHour] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSelectHour = async () => {
    if (!selectedHour) return;

    setIsSubmitting(true);
    try {
      await createBooking({
        eventId: eventId,
        eventDate: date,
        fromTime: selectedHour,
        meetingLength: meetingLength,
        menssage: message,
      });

      setSelectedHour("");
      setMessage("");
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const groupedHours = groupHoursByTimeFrame(hours);

  return (
    <section className="space-y-8">
      <div className="space-y-2">
        <Label htmlFor="time-select" className="flex items-center space-x-2">
          <Clock className="h-4 w-4" />
          <span>Horario</span>
        </Label>
        <Select
          value={selectedHour}
          onValueChange={(value) => setSelectedHour(value)}>
          <SelectTrigger id="time-select" className="w-full">
            <SelectValue placeholder="Selecciona un horario" />
          </SelectTrigger>
          <SelectContent>
            <ScrollArea className="h-[200px]">
              {groupedHours.map((group, groupIndex) => (
                <SelectGroup key={groupIndex}>
                  <SelectLabel>
                    {group[0]} - {group[group.length - 1]}
                  </SelectLabel>
                  {group.map((hour) => (
                    <SelectItem key={hour} value={hour}>
                      {hour}
                    </SelectItem>
                  ))}
                </SelectGroup>
              ))}
            </ScrollArea>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message" className="flex items-center space-x-2">
          <MessageSquare className="h-4 w-4" />
          <span>Mensaje de la reunión</span>
        </Label>
        <Textarea
          id="message"
          placeholder="Escribe tu mensaje aquí."
          className="h-[90px] resize-none"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>

      <Button
        onClick={handleSelectHour}
        disabled={!selectedHour || isSubmitting}
        className="w-full">
        {isSubmitting ? "Reservando..." : "Reservar"}
      </Button>
    </section>
  );
};

export default SelectTable;
