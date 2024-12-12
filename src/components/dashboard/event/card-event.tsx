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
import { Calendar, Trash2, Edit3 } from "lucide-react";
import { DeleteEvent } from "@/app/actions/admin.actions";
import { CardEventsType } from "./types/types-event";
import CustomAlertDialog from "@/components/shared/custom-alert-dialog";
type EventType = {
  event: CardEventsType;
  setIsOpenAlert: (isOpen: boolean) => void;
  isOpenAlert: boolean;
};

const handleDeleteEvent = async (id: string) => {
  await DeleteEvent(id);
};

const CardEvent = ({ event, setIsOpenAlert, isOpenAlert }: EventType) => {
  return (
    <div>
      <Card className="w-full  bg-white shadow-lg rounded-md border border-gray-200 ">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg font-semibold text-gray-800">
              {event.title}
            </CardTitle>
            <Calendar className="w-5 h-5 text-gray-400" />
          </div>
          <CardDescription className="text-sm text-gray-600 mt-1">
            {event.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="text-gray-700">
          <p className="text-sm">
            Duración: <strong>{event.length} minutos</strong>
          </p>
        </CardContent>
        <CardFooter className="flex justify-end space-x-2 mt-2">
          <button
            onClick={() => console.log("Actualizar evento")}
            className="flex items-center px-3 py-1.5 text-sm font-medium text-white bg-green-800 rounded-md hover:bg-green-600 focus:ring-2 focus:ring-green-300 focus:outline-none transition">
            <Edit3 className="w-4 h-4 mr-1" /> Actualizar
          </button>
          <button
            onClick={() => setIsOpenAlert(!isOpenAlert)}
            className="flex items-center px-3 py-1.5 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600 focus:ring-2 focus:ring-red-300 focus:outline-none transition">
            <Trash2 className="w-4 h-4 mr-1" /> Eliminar
          </button>
        </CardFooter>
      </Card>
      <CustomAlertDialog
        isOpenAlert={isOpenAlert}
        setIsOpenAlert={setIsOpenAlert}
        title="Estas seguro que deseas eliminar este evento?"
        description="Este evento se eliminara de la lista de eventos disponibles para los usuarios."
        fc={() => handleDeleteEvent(event._id)}
        destructive={true}
      />
    </div>
  );
};

export default CardEvent;
