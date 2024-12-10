"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PlusCircle, Calendar, HelpCircle } from "lucide-react";

import CreateNewEvent from "./create-new-event";
import { AvailabilityDays } from "./availability-days";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { days } from "@/constants";
import { Schedule } from "./types-schedule";

export function EventManagementTabs() {
  const [activeTab, setActiveTab] = useState("create-events");
  const [schedules, setSchedules] = useState<Record<string, Schedule>>(
    days.reduce(
      (acc, day) => ({
        ...acc,
        [day]: { enabled: true, start: "09:00", end: "17:00" },
      }),
      {}
    )
  );
  const [data, setData] = useState({
    title: "",
    url: "",
    description: "",
    duration: "",
  });

  const handleOnSubmit = () => {
    const newData = {
      data,
      schedules,
    };
    console.log(newData);
  };

  return (
    <div className="flex lg:flex-row flex-col gap-2 lg:gap-14 ">
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
      <div className="flex flex-col h-full items-center mt-2  lg:mt-40">
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
          <Button
            onClick={handleOnSubmit}
            type="submit"
            className="bg-gray-900">
            Agregar Evento
          </Button>
        </CardContent>
      </div>
    </div>
  );
}
