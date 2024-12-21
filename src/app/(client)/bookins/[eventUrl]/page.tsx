import { getEvent } from "@/app/actions/admin.actions";
import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import { currentUser } from "@clerk/nextjs/server";
import { notFound, redirect } from "next/navigation";
import EventNotFound from "@/components/client/bookins/event/eventNotFound";
import BookinComponents from "@/components/client/bookins/bookin-components";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface Params {
  eventUrl: string;
}

interface SearchParams {
  date?: string;
  time: string;
}

const fetchEventData = async (eventUrl: string) => {
  const eventData = await getEvent(eventUrl);
  if (!eventData) throw notFound();
  return {
    ...eventData,
    event: { ...eventData.event },
  };
};

const filterHoursForDay = (day: string, days: any[]) => {
  const hoursForDay = days.find((d) => d.day === day);
  return hoursForDay || null;
};

const BookinsPage = async ({
  params: paramsPromise,
  searchParams: searchParamsPromise,
}: {
  params: Promise<Params>;
  searchParams: Promise<SearchParams>;
}) => {
  const params = await paramsPromise;
  const searchParams = await searchParamsPromise;

  const user = await currentUser();
  if (!user) return redirect("/sign-in");

  const { eventUrl } = params;
  const date = searchParams.date || new Date().toISOString();
  const selectedDate = parseISO(date);

  const formattedDate = format(selectedDate, "EEEE, d 'de' MMMM 'de' yyyy", {
    locale: es,
  });
  const day = formattedDate.split(",")[0];

  try {
    const eventData = await fetchEventData(eventUrl);
    const hoursForSelectedDay = filterHoursForDay(day, eventData.days);

    if (!hoursForSelectedDay) throw notFound();

    const data = {
      event: eventData.event,
      days: eventData.days.map((day) => ({
        ...day,
        from: day.start,
        to: day.end,
      })),
      user,
      formattedDate,
      selectedDate,
      hoursForSelectedDay,
      date,
      time: eventData.event.length,
      eventUrl,
    };

    return (
      <Suspense
        fallback={
          <div className="container mx-auto py-8 mt-16 ">
            <div className="flex  gap-6 mx-auto max-w-7xl">
              <Skeleton className="h-[500px] w-full" />
              <Skeleton className="h-[500px] w-full" />
              <Skeleton className="h-[500px] w-full" />
            </div>
          </div>
        }>
        <BookinComponents data={data} />
      </Suspense>
    );
  } catch (error) {
    return <EventNotFound />;
  }
};

export default BookinsPage;
