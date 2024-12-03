"use server";

import { revalidatePath } from "next/cache";
import User from "../../lib/database/models/user.model";
import { handleError } from "../../lib/utils";
import { connectToDatabase } from "../../lib/mongoose";
import { checkRole } from "@/lib/roles";
import appointmentModel from "@/lib/database/models/appointment.model";
import adminModel from "@/lib/database/models/admin.model";
import userModel from "../../lib/database/models/user.model";

export async function createUser(user: any) {
  const isAdmin = await checkRole("admin");
  if (!isAdmin) throw new Error("Access denied");

  try {
    await connectToDatabase();
    const newUser = await userModel.create(user);
    return {
      success: true,
      message: "User created successfully",
      data: JSON.parse(JSON.stringify(newUser)),
    };
  } catch (error) {
    handleError(error);
  }
}

export async function getUsers() {
  const isAdmin = await checkRole("admin");

  if (!isAdmin) {
    throw new Error("Access denied");
  }

  try {
    await connectToDatabase();

    const users = await User.find({});

    if (!users) throw new Error("User not found");

    return {
      success: true,
      message: "Users successfully",
      users: users,
    };
  } catch (error) {
    handleError(error);
  }
}

export async function getUserById(userId: string) {
  const isAdmin = await checkRole("admin");

  if (!isAdmin) {
    throw new Error("Access denied");
  }
  try {
    await connectToDatabase();

    const user = await User.findOne({ clerkId: userId });

    if (!user) throw new Error("User not found");

    return {
      success: true,
      message: "User successfully",
      user,
    };
  } catch (error) {
    handleError(error);
  }
}

// // UPDATE
// export async function updateUser(clerkId: string, user: UpdateUserParams) {
//   try {
//     await connectToDatabase();

//     const updatedUser = await User.findOneAndUpdate({ clerkId }, user, {
//       new: true,
//     });

//     if (!updatedUser) throw new Error("User update failed");

//     return JSON.parse(JSON.stringify(updatedUser));
//   } catch (error) {
//     handleError(error);
//   }
// }

export async function deleteUser(clerkId: string) {
  const isAdmin = await checkRole("admin");

  if (!isAdmin) {
    throw new Error("Access denied");
  }

  try {
    await connectToDatabase();

    const userToDelete = await User.findOne({ clerkId });

    if (!userToDelete) {
      throw new Error("User not found");
    }

    const deletedUser = await User.findByIdAndDelete(userToDelete._id);
    revalidatePath("/users");

    return {
      success: true,
      message: "User deleted successfully",
      deleteUser,
    };
  } catch (error) {
    handleError(error);
  }
}

export async function bookAppointment(
  userId: string,
  slotDate: string,
  slotTime: string,
  message: string
) {
  const isAdmin = await checkRole("admin");

  if (!isAdmin) {
    throw new Error("Access denied");
  }

  try {
    await connectToDatabase();

    const adminData = await adminModel.findOne({}, "slots_booked");

    const slotsBooked = adminData?.slots_booked || {};

    const isSlotTaken = slotsBooked[slotDate]?.includes(slotTime);

    if (isSlotTaken) {
      throw new Error("Horario ocupado");
    }

    slotsBooked[slotDate] = slotsBooked[slotDate] || [];
    slotsBooked[slotDate].push(slotTime);

    const userData = await userModel
      .findById(userId)
      .select("-password -clerkId");

    const newAppointment = new appointmentModel({
      userId,
      userData,
      slotTime,
      slotDate,
      message,
      date: Date.now(),
    });

    await newAppointment.save();
    await adminModel.updateOne({}, { slots_booked: slotsBooked });

    return {
      success: true,
      message: "Appointment booked successfully",
      data: JSON.parse(JSON.stringify(newAppointment)),
    };
  } catch (error) {
    handleError(error);
  }
}
