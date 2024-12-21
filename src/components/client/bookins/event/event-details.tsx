import { Calendar, CalendarIcon, Clock, MapPin, Video } from "lucide-react";
import { Event } from "../interfaces";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
interface EventDetailsProps {
  event: Event;
  formattedDate: string;
}

export function EventDetails({ event, formattedDate }: EventDetailsProps) {
  return (
    <CardContent className="grid gap-2">
      <div className="flex items-center space-x-2">
        <Calendar className="h-5 w-5 text-muted-foreground" />
        <span>{formattedDate}</span>
      </div>
      <div className="flex items-center space-x-2">
        <Clock className="h-5 w-5 text-muted-foreground" />
        <span>{event?.length} minutos</span>
      </div>
      <div className="flex items-center space-x-2">
        {event?.presential?.status ? (
          <>
            <MapPin className="h-5 w-5 text-muted-foreground" />
            <span>{event?.presential.address}</span>
          </>
        ) : (
          <>
            <Video className="h-5 w-5 text-muted-foreground" />
            <span>{event?.platform?.name}</span>
          </>
        )}
      </div>
    </CardContent>
  );
}
