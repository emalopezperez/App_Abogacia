import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  CalendarIcon,
  ChevronRight,
  Clock,
  User,
  Calendar,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { UserInfo } from "@/components/client/shared/user-info";
import { EventDetails } from "@/components/client/bookins/event/event-details";
import { RenderCalendar } from "@/components/client/bookins/calendar/render-calendar";
import TimeTable from "@/components/client/bookins/time-table/time-table";
import { DataEvent } from "./interfaces";
import {
  format,
  fromUnixTime,
  isBefore,
  addMinutes,
  parse,
  isWithinInterval,
} from "date-fns";
import { FreeBusyTimeSlot } from "./interfaces";
import { getAvailability } from "@/app/actions/admin.actions";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

function calculateAvailableTimeSlotsFromNylas(props: any) {
  const { nylasData, time, hoursForSelectedDay } = props;

  const busySlots =
    nylasData?.data?.[0]?.timeSlots?.map((slot: FreeBusyTimeSlot) => ({
      start: fromUnixTime(slot.startTime),
      end: fromUnixTime(slot.endTime),
    })) || [];

  const formattedSlots = busySlots.map((slot: any) => ({
    start: format(slot.start, "HH:mm"),
    end: format(slot.end, "HH:mm"),
  }));

  function generateTimeSlots(from: string, to: string, interval: number) {
    const start = parse(from, "HH:mm", new Date());
    const end = parse(to, "HH:mm", new Date());

    const timeSlots: string[] = [];
    let currentTime = start;

    while (isBefore(currentTime, end)) {
      timeSlots.push(format(currentTime, "HH:mm"));
      currentTime = addMinutes(currentTime, interval);
    }

    return timeSlots;
  }

  function isTimeBooked(time: string, busySlots: typeof formattedSlots) {
    const currentTime = parse(time, "HH:mm", new Date());
    return busySlots.some((slot: any) => {
      const startTime = parse(slot.start, "HH:mm", new Date());
      const endTime = parse(slot.end, "HH:mm", new Date());
      return isWithinInterval(currentTime, { start: startTime, end: endTime });
    });
  }

  const allSlots = generateTimeSlots(
    hoursForSelectedDay.from,
    hoursForSelectedDay.to,
    time
  );

  const availableSlots = allSlots.filter(
    (slot) => !isTimeBooked(slot, formattedSlots)
  );

  return availableSlots;
}

const BookinComponents = async ({ data }: { data: DataEvent }) => {
  const {
    event,
    user,
    formattedDate,
    selectedDate,
    hoursForSelectedDay,
    days,
    time,
    date,
  } = data;

  const { nylasCalendarData } = await getAvailability(
    selectedDate || new Date()
  );

  const availableTimeSlots = calculateAvailableTimeSlotsFromNylas({
    nylasData: nylasCalendarData,
    selectedDate,
    time,
    hoursForSelectedDay,
  });

  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="mx-auto max-w-7xl shadow-lg">
        <CardHeader className="bg-gray-800 text-white">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <CardTitle className="text-3xl font-bold">
                {event.title}
              </CardTitle>
              <CardDescription className="mt-2 text-gray-300">
                {event.description}
              </CardDescription>
            </div>
            <Button
              variant="outline"
              asChild
              className="w-full sm:w-auto bg-white text-gray-800 hover:bg-gray-100">
              <a href="/" className="flex items-center justify-center">
                <CalendarIcon className="mr-2 h-4 w-4" /> Mis reservas
              </a>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="space-y-8 lg:col-span-1">
              <Card className="bg-gray-50">
                <CardHeader className="bg-gray-100 mb-2 text-md font-semibold">
                  <CardTitle className="text-xl font-semibold flex items-center">
                    <User className="mr-2 h-5 w-5" />
                    Información del cliente
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <UserInfo user={user} />
                </CardContent>
              </Card>

              <Card className="space-y-4">
                <CardHeader className="bg-gray-100 mb-2">
                  <CardTitle className="flex items-center space-x-2 text-md font-semibold">
                    <CalendarIcon className="h-5 w-5" />
                    <span>Detalles del evento</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <EventDetails event={event} formattedDate={formattedDate} />
                </CardContent>
              </Card>

              <Card className="mt-4">
                <CardHeader className="bg-gray-100 mb-2">
                  <CardTitle className="flex items-center space-x-2 text-md font-semibold">
                    <CalendarIcon className="h-5 w-5" />
                    <span>Días disponibles</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                  <TooltipProvider>
                    {days.map((day, index) =>
                      day.active ? (
                        <Tooltip key={index}>
                          <TooltipTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="rounded-full">
                              {day.day}
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Día disponible</p>
                          </TooltipContent>
                        </Tooltip>
                      ) : (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="px-3 py-1 opacity-50">
                          {day.day}
                        </Badge>
                      )
                    )}
                  </TooltipProvider>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-2">
              <div className="grid gap-6 md:grid-cols-2">
                <Card className="bg-gray-50">
                  <CardHeader className="bg-gray-100 mb-2 text-md font-semibold">
                    <CardTitle className="flex items-center space-x-2">
                      <CalendarIcon className="h-5 w-5" />
                      <span>Selecciona fecha</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RenderCalendar daysofWeek={days} />
                  </CardContent>
                </Card>

                <TimeTable
                  selectedDate={selectedDate}
                  time={time}
                  hoursForSelectedDay={hoursForSelectedDay}
                  date={date}
                  eventId={event.id}
                  availableTimeSlots={availableTimeSlots}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookinComponents;
