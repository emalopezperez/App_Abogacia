"use server";

import { Admin } from "@/lib/database/models/admin.model";
import { EventTypeModel } from "@/lib/database/models/event.model";
import { getEmail } from "@/lib/get-email";
import { connectToDatabase } from "@/lib/mongoose";
import { checkRole } from "@/lib/roles";
import { handleError } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server";

export async function CreateEvent(data: any) {
  const email = await getEmail();

  try {
    await connectToDatabase();

    const newEvent = await EventTypeModel.create({
      email,
      title: data.title,
      uri: data.url,
      description: data.description,
      length: data.duration,
      bookingTimes: data.bookingTimes,
    });

    console.log(newEvent);
  } catch (error) {
    console.error("Error al configurar la disponibilidad:", error);
    throw error;
  }
}
