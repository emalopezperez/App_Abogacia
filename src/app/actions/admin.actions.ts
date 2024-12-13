"use server";

import { EventTypeModel } from "@/lib/database/models/event.model";
import { getAdmin } from "@/utils/get-admin";
import { connectToDatabase } from "@/lib/mongoose";
import { handleError } from "@/utils/utils";
import { revalidatePath } from "next/cache";
import { nylas } from "@/lib/nylas";
import { isAdmin } from "@/utils/isAdmin";
import userModel from "@/lib/database/models/user.model";
import { getUser } from "@/utils/get-user";

export async function CreateEvent(data: any) {
  const isAdminCheck = await isAdmin();
  const admin = await getAdmin();
  const email = admin?.emailAddresses[0].emailAddress;

  if (!isAdminCheck) {
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
      platform: data.platform,
      presential: data.presential,
    });

    revalidatePath("/dashboard/events");
    return { succes: "Succes" };
  } catch (error) {
    handleError(error);
  }
}

export async function GetEvents() {
  const isAdminCheck = await isAdmin();

  if (!isAdminCheck) {
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
  const isAdminCheck = await isAdmin();

  if (!isAdminCheck) {
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

export async function UpdateEvent(id: string, data: any) {
  const admin = await getAdmin();
  const email = admin?.emailAddresses[0].emailAddress;
  const isAdminCheck = await isAdmin();

  if (!isAdminCheck) {
    throw new Error("Access denied");
  }

  try {
    await connectToDatabase();
    await EventTypeModel.findByIdAndUpdate(id, {
      email,
      title: data.title,
      uri: data.url,
      description: data.description,
      length: data.duration,
      bookingTimes: data.bookingTimes,
    });
    revalidatePath("/dashboard/events");
    return { success: "Event updated successfully" };
  } catch (error) {
    handleError(error);
  }
}

export async function createBooking(data: any) {
  const user = await getUser();
  const userId = user?.id;

  if (!userId) {
    throw new Error("User not authenticated");
  }

  if (!process.env.NYLAS_GRANT_ID || !process.env.NYLAS_EMAIL) {
    throw new Error("Nylas credentials are missing");
  }

  try {
    await connectToDatabase();
    const getDataUser = await userModel
      .findOne({ clerkUserId: userId })
      .select("email username phone");

    const eventData = await EventTypeModel.findOne({ _id: data.eventId });

    if (!eventData) {
      throw new Error("Event not found");
    }

    const formTime = data.fromTime;
    const meetingLength = Number(data.meetingLength);
    const eventDate = data.eventDate;

    const startDateTime = new Date(`${eventDate}T${formTime}:00`);
    const endDateTime = new Date(
      startDateTime.getTime() + meetingLength * 60000
    );

    const isVirtual = eventData.platform?.status;
    const isPresential = eventData.presential?.status;

    if (isVirtual && isPresential) {
      throw new Error("Event cannot be both virtual and presential");
    }

    const requestBody: any = {
      title: eventData.title,
      description: `${eventData.description} \n\nMessage from user: ${
        data.message || ""
      }`,
      when: {
        startTime: Math.floor(startDateTime.getTime() / 1000),
        endTime: Math.floor(endDateTime.getTime() / 1000),
      },
      participants: [
        {
          name: getDataUser.username,
          email: getDataUser.email,
          status: "yes",
          phoneNumber: getDataUser.phone,
        },
      ],
    };

    if (isVirtual) {
      requestBody.conferencing = {
        autocreate: {},
        provider: eventData.platform.name,
      };
    } else if (isPresential) {
      requestBody.location = eventData.presential.address || "";
    } else {
      throw new Error("Event must be either virtual or presential");
    }

    const response = await nylas.events.create({
      identifier: process.env.NYLAS_GRANT_ID!,
      requestBody,
      queryParams: {
        calendarId: process.env.NYLAS_EMAIL!,
        notifyParticipants: true,
      },
    });

    return { message: "Meeting created successfully", response };
  } catch (error) {
    console.error(error);
    handleError(error);
  }
}
