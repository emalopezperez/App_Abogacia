import { Clock, MapPin, Video } from "lucide-react";

export function EventDetails({ event }: any) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Detalles del evento</h3>
      <div className="grid gap-2">
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
      </div>
    </div>
  );
}
