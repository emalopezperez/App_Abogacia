"use server";

import { EventTypeModel } from "@/lib/database/models/event.model";
import { getEmail } from "@/lib/get-email";
import { connectToDatabase } from "@/lib/mongoose";
import { checkRole } from "@/lib/roles";
import { handleError } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export async function CreateEvent(data: any) {
  const isAdmin = await checkRole("admin");
  const email = await getEmail();

  if (!isAdmin) {
    throw new Error("Access denied");
  }

  try {
    await connectToDatabase();

    await EventTypeModel.create({
      email,
      title: data.title,
      uri: data.url,
      description: data.description,
      length: data.duration,
      bookingTimes: data.bookingTimes,
    });
    return { succes: "Succes" };
  } catch (error) {
    handleError(error);
  }
}

export async function GetEvents() {
  const isAdmin = await checkRole("admin");

  if (!isAdmin) {
    throw new Error("Access denied");
  }

  try {
    await connectToDatabase();
    const events = await EventTypeModel.find({}).lean();
    return JSON.parse(JSON.stringify(events));
  } catch (error) {
    handleError(error);
  }
}

export async function DeleteEvent(id: string) {
  const isAdmin = await checkRole("admin");

  if (!isAdmin) {
    throw new Error("Access denied");
  }

  try {
    await connectToDatabase();
    await EventTypeModel.findByIdAndDelete(id);
    revalidatePath("/dashboard/events");
    return { success: "Event deleted successfully" };
  } catch (error) {
    handleError(error);
  }
}
