"use server";

import { revalidatePath } from "next/cache";
import User from "../../lib/database/models/user.model";
import { handleError } from "../../lib/utils";
import { connectToDatabase } from "../../lib/mongoose";
import { checkRole } from "@/lib/roles";

export async function createUser(user: any) {
  try {
    await connectToDatabase();

    const newUser = await User.create(user);

    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    console.log(error);
    // handleError(error);
  }
}

export async function getUsers() {
  const isAdmin = await checkRole("admin");

  if (!isAdmin) {
    throw new Error("Access denied");
  }

  try {
    await connectToDatabase();

    const user = await User.find({});

    if (!user) throw new Error("User not found");

    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    handleError(error);
  }
}

export async function getUserById(userId: string) {
  try {
    await connectToDatabase();

    const user = await User.findOne({ clerkId: userId });

    if (!user) throw new Error("User not found");

    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    console.log(error);
    // handleError(error);
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

    return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null;
  } catch (error) {
    handleError(error);
  }
}
