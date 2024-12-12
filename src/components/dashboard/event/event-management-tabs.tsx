"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PlusCircle, Calendar } from "lucide-react";

import CreateNewEvent from "./create-new-event";
import { AvailabilityDays } from "./availability-days";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { days } from "@/constants";
import { Schedule } from "./types/types-event";
import { toast } from "sonner";
import { CreateEvent } from "@/app/actions/admin.actions";
import { useRouter } from "next/navigation";

export function EventManagementTabs() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("create-events");
  const [data, setData] = useState({
    title: "",
    url: "",
    description: "",
    duration: "",
  });
  const [schedules, setSchedules] = useState<Record<string, Schedule>>(
    days.reduce(
      (acc, day) => ({
        ...acc,
        [day]: { active: true, from: "09:00", to: "17:00" },
      }),
      {}
    )
  );

  const handleOnSubmit = async () => {
    const newData = {
      title: data.title,
      url: data.url,
      description: data.description,
      duration: data.duration,
      bookingTimes: schedules,
    };
    try {
      const result = await CreateEvent(newData);
      if (result) {
        toast("Evento creado correctamente", {
          description: "Sunday, December 03, 2023 at 9:00 AM",
          action: {
            label: "cerrar",
            onClick: () => console.log("Cerrando"),
          },
        });
        router.push("/dashboard/events");
      }
    } catch (error) {
      console.error("Error al crear el evento:", error);
    }
  };

  const isFormComplete = () => {
    return Object.values(data).every((value) => value.trim() !== "");
  };

  return (
    <div className="flex lg:flex-row flex-col gap-2 lg:gap-6">
      <Card className=" w-full lg:w-[700px] bg-inherit">
        <CardContent>
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full ">
            <TabsList className="flex mb-10 bg-transparent gap-2 justify-center lg:justify-start">
              <TabsTrigger
                value="create-events"
                className="flex items-center justify-center py-3 text-base ">
                <PlusCircle className="w-5 h-5 mr-2 text-orange-400" />
                Crear Nuevo Evento
              </TabsTrigger>
              <TabsTrigger
                value="availability"
                className="flex items-center justify-center py-3 text-base ">
                <Calendar className="w-5 h-5 mr-2 text-green-600" />
                Establecer Disponibilidad
              </TabsTrigger>
            </TabsList>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}>
                <TabsContent value="create-events" className="mt-6 space-y-4">
                  <CreateNewEvent data={data} setData={setData} />
                </TabsContent>
                <TabsContent value="availability" className="mt-6 space-y-4 ">
                  <AvailabilityDays
                    setSchedules={setSchedules}
                    schedules={schedules}
                  />
                </TabsContent>
              </motion.div>
            </AnimatePresence>
          </Tabs>
        </CardContent>
      </Card>
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}>
          <div className="  mt-2 lg:mt-20 bg-slate-200/20 rounded-lg shadow-lg">
            <CardHeader className="">
              <CardTitle className="text-xl font-semibold">
                Agregar Evento
              </CardTitle>
              <CardDescription>
                Crear un nuevo evento que permita a los usuarios agendar citas.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center lg:justify-start space-x-2 w-full">
              <Button asChild variant="outline">
                <Link href="/dashboard">Cancel</Link>
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    disabled={!isFormComplete()}
                    variant="outline"
                    className="transition-all duration-300 bg-gray-900 text-white hover:bg-gray-500 hover:text-white">
                    Agregar Evento
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Estas seguro que deseas agregar este evento?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Este evento se agregara a la lista de eventos disponibles
                      para los usuarios.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleOnSubmit}
                      type="submit"
                      className="transition-all duration-300 bg-gray-900 text-white hover:bg-gray-500 hover:text-white">
                      Aceptar
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardContent>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
