"use client";

import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar, Clock, Trash2, Edit3, CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DeleteEvent } from "@/app/actions/admin.actions";
import { CardEventsType, WeekdayName } from "./types/types-event";
import CustomAlertDialog from "@/components/shared/custom-alert-dialog";
import { ScheduleModal } from "./schedule-modal";
import CustomSheet from "@/components/shared/custom-sheet";
import { EditEvent } from "./edit-event/edit-event";

type EventType = {
  event: CardEventsType;
  setIsOpenAlert: (isOpen: boolean) => void;
  isOpenAlert: boolean;
};

const handleDeleteEvent = async (id: string) => {
  await DeleteEvent(id);
};

const CardEvent = ({ event, setIsOpenAlert, isOpenAlert }: EventType) => {
  const [isScheduleModalOpen, setIsScheduleModalOpen] = React.useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
  const activeDays = Object.entries(event.bookingTimes)
    .filter(([_, schedule]) => schedule.active)
    .map(([day]) => day as WeekdayName);

  return (
    <Card className="w-full bg-card text-card-foreground shadow-lg rounded-lg border border-border hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      <CardHeader className="dark:bg-black/20 bg-slate-100/70 pb-4">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-bold text-primary font-serif dark:text-white">
            {event.title}
          </CardTitle>
          <Calendar className="w-6 h-6 text-primary" />
        </div>
        <CardDescription className="text-sm text-muted-foreground mt-2 line-clamp-2 font-sans">
          {event.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-4 space-y-2 ">
        <div className="flex items-center text-sm text-muted-foreground">
          <Clock className="w-4 h-4 mr-2" />
          <span>
            Duración: <strong>{event.length} minutos</strong>
          </span>
        </div>
        <div className="flex items-center text-sm text-muted-foreground min-h-[60px]">
          <CalendarIcon className="w-4 h-4 mr-2" />
          <span>
            Días:{" "}
            <strong className="font-sans">
              {activeDays.length > 0 ? activeDays.join(", ") : "Ninguno"}
            </strong>
          </span>
        </div>
        <Button
          onClick={() => setIsScheduleModalOpen(true)}
          variant="outline"
          size="sm"
          className="w-full mt-2 text-sm">
          Ver horarios
        </Button>
      </CardContent>
      <CardFooter className="flex justify-end space-x-2 mt-2 bg-muted/30 pt-4">
        <Button
          onClick={() => setIsEditModalOpen(!isEditModalOpen)}
          variant="outline"
          size="sm"
          className="flex items-center">
          <Edit3 className="w-4 h-4 mr-1" /> Actualizar
        </Button>
        <Button
          onClick={() => setIsOpenAlert(!isOpenAlert)}
          size="sm"
          className="flex items-center">
          <Trash2 className="w-4 h-4 mr-1" /> Eliminar
        </Button>
      </CardFooter>
      <CustomAlertDialog
        isOpenAlert={isOpenAlert}
        setIsOpenAlert={setIsOpenAlert}
        title="¿Estás seguro que deseas eliminar este evento?"
        description="Este evento se eliminará de la lista de eventos disponibles para los usuarios."
        fc={() => handleDeleteEvent(event._id)}
        destructive={true}
      />
      <ScheduleModal
        isOpen={isScheduleModalOpen}
        setIsOpen={setIsScheduleModalOpen}
        bookingTimes={event.bookingTimes}
      />
      <CustomSheet
        title="Editar evento"
        description="Edita los detalles del evento"
        children={<EditEvent onOpenChange={setIsEditModalOpen} event={event} />}
        onOpenChange={setIsEditModalOpen}
        open={isEditModalOpen}
      />
    </Card>
  );
};

export default CardEvent;
