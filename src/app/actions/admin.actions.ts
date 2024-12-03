"use server";

import appointmentModel from "@/lib/database/models/appointment.model";
import User from "../../lib/database/models/user.model";
import { connectToDatabase } from "@/lib/mongoose";
import { checkRole } from "@/lib/roles";
import { handleError } from "@/lib/utils";

export const getAllAppointments = async () => {
  const isAdmin = await checkRole("admin");

  if (!isAdmin) {
    throw new Error("Access denied");
  }

  try {
    await connectToDatabase();
    const data = await appointmentModel.find({});

    return {
      success: true,
      message: "Successfully",
      data: JSON.parse(JSON.stringify(data)),
    };
  } catch (error) {
    handleError(error);
  }
};

export const getDataDashboard = async () => {
  const isAdmin = await checkRole("admin");

  if (!isAdmin) {
    throw new Error("Access denied");
  }

  try {
    await connectToDatabase();
    const appointments = await appointmentModel.find({});
    const users = await User.find({});

    return {
      success: true,
      message: "Successfully",
      data: {
        appointments,
        users,
      },
    };
  } catch (error) {
    handleError(error);
  }
};

export const cancelAppointment = async (appointmentId: string) => {
  const isAdmin = await checkRole("admin");

  if (!isAdmin) {
    throw new Error("Access denied");
  }
  try {
    await connectToDatabase();

    const appointment = await appointmentModel.findByIdAndUpdate(
      appointmentId,
      {
        cancelled: true,
      }
    );

    return {
      success: true,
      message: "Cancel successfully",
      data: JSON.parse(JSON.stringify(appointment)),
    };
  } catch (error) {
    handleError(error);
  }
};
