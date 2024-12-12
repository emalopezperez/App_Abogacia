"use server";

import { revalidatePath } from "next/cache";
import User from "../../lib/database/models/user.model";
import { handleError } from "../../lib/utils";
import { connectToDatabase } from "../../lib/mongoose";
import { checkRole } from "@/lib/roles";
import userModel from "../../lib/database/models/user.model";

export async function createUser(user: any) {
  try {
    await connectToDatabase();

    const newUser = await userModel.create(user);

    return newUser;
  } catch (error) {
    handleError(error);
  }
}

export async function updateUser(user: any) {
  const { clerkUserId } = user;
  try {
    await connectToDatabase();

    const updatedUser = await userModel.findOneAndUpdate(
      { clerkUserId },
      user,
      {
        new: true,
      }
    );

    if (!updatedUser) throw new Error("User update failed");

    return updatedUser;
  } catch (error) {
    handleError(error);
  }
}

export async function deleteUser(clerkId: string) {
  try {
    await connectToDatabase();

    const userToDelete = await userModel.findOne({ clerkId });

    if (!userToDelete) {
      return {
        success: false,
        message: "User not found",
      };
    }

    await userModel.findByIdAndDelete(userToDelete._id);

    revalidatePath("/users");

    return {
      success: true,
      message: "User deleted successfully",
    };
  } catch (error) {
    handleError(error);
    return {
      success: false,
      message: "An error occurred while deleting the user",
    };
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