"use client";

import CustomAlertDialog from "@/components/shared/custom-alert-dialog";
import CardEvent from "./card-event";
import { CardEventsType } from "./types/types-event";
import { useState } from "react";

interface ListEventsProps {
  dataEvents: CardEventsType[];
}
const ListEvents = ({ dataEvents }: ListEventsProps) => {
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  return (
    <div className="grid grid-cols-1 gap-x-2 gap-y-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8 mt-10">
      {dataEvents?.length > 0 ? (
        dataEvents?.map((event: any) => (
          <CardEvent
            key={event._id}
            event={event}
            setIsOpenAlert={setIsOpenAlert}
            isOpenAlert={isOpenAlert}
          />
        ))
      ) : (
        <p className="text-center text-gray-500">Usted no tiene eventos</p>
      )}
    </div>
  );
};

export default ListEvents;
