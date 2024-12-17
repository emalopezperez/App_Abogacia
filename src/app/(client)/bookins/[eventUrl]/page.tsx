import { Suspense } from "react";
import { getEvent } from "@/app/actions/admin.actions";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { currentUser } from "@clerk/nextjs/server";
import { notFound, redirect } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Clock, MapPin, Video, CalendarIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { UserInfo } from "@/components/client/user-info";
import { EventDetails } from "@/components/client/event-details";
import { RenderCalendar } from "@/components/client/bookins/render-calendar";

type PageProps = {
  params: { eventUrl: string };
  searchParams: { date?: string; time?: string };
};

async function getData(eventUrl: string) {
  const eventData = await getEvent(eventUrl);

  if (!eventData) {
    return notFound();
  }

  return eventData;
}

const BookinsPage = async (props: {
  params: Promise<{ username: string; eventUrl: string }>;
  searchParams: Promise<{ date?: string; time?: string }>;
}) => {
  const searchParams = await props.searchParams;
  const params = await props.params;
  const user = await currentUser();
  if (!user) return redirect("/sign-in");

  const date = await searchParams.date;
  const time = await searchParams.time;
  const eventUrl = await params.eventUrl;

  const selectedDate = date ? new Date(date) : new Date();

  const formattedDate = new Intl.DateTimeFormat("es-ES", {
    weekday: "long",
    day: "numeric",
    month: "long",
    timeZone: "UTC",
  }).format(selectedDate);

  const eventData = await getData(eventUrl);

  if (!eventData) {
    return (
      <div className="container mx-auto py-8">
        <Card className="mx-auto max-w-5xl">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold text-center">
              Evento no encontrado
            </h2>
            <p className="text-center mt-4">
              Lo sentimos, el evento que estás buscando no existe o ha sido
              eliminado.
            </p>
            <div className="flex justify-center mt-6">
              <Button asChild>
                <a href="/">Volver a la página principal</a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <Card className="mx-auto max-w-5xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-3xl font-bold">
                {eventData.event.title}
              </CardTitle>
              <CardDescription className="mt-2">
                {eventData.event.description}
              </CardDescription>
            </div>
            <Button variant="outline" asChild>
              <a href="/" className="flex items-center">
                <CalendarIcon className="mr-2 h-4 w-4" /> Mis reservas
              </a>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-2">
          <div className="space-y-6">
            <Suspense fallback={<Skeleton className="h-20 w-full" />}>
              <UserInfo user={user} />
            </Suspense>
            <Separator />
            <Suspense fallback={<Skeleton className="h-40 w-full" />}>
              <EventDetails event={eventData?.event} />
            </Suspense>
            <Separator />
            <div>
              <h3 className="text-lg font-semibold mb-2">Días disponibles</h3>
              <div className="flex flex-wrap gap-2">
                {eventData?.days.map((day, index) =>
                  day.active ? (
                    <Badge key={index} variant="secondary">
                      {day.day}
                    </Badge>
                  ) : null
                )}
              </div>
            </div>
          </div>
          <div className="md:border-l md:pl-6">
            <h3 className="text-lg font-semibold mb-4">
              Selecciona una fecha y hora
            </h3>
            <Suspense fallback={<Skeleton className="h-[400px] w-full" />}>
              <RenderCalendar daysofWeek={eventData.days} />
            </Suspense>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookinsPage;

// const bookings = await createBooking({
//   //         eventId: "675c86d46ff8946813223d52",
//   //         eventDate: "2024-12-14",
//   //         fromTime: "10:30",
//   //         meetingLength: 60,
//   //         message: "Primeara iagenda ",
