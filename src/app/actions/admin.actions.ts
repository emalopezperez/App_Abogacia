"use server";

import { EventTypeModel } from "@/lib/database/models/event.model";
import { connectToDatabase } from "@/lib/mongoose";
import { checkRole } from "@/lib/roles";
import { handleError } from "@/lib/utils";


// export const getAllAppointments = async () => {
//   const isAdmin = await checkRole("admin");

//   if (!isAdmin) {
//     throw new Error("Access denied");
//   }

//   try {
//     await connectToDatabase();
//     const data = await appointmentModel.find({});

//     return {
//       success: true,
//       message: "Successfully",
//       data: JSON.parse(JSON.stringify(data)),
//     };
//   } catch (error) {
//     handleError(error);
//   }
// };

// export const getDataDashboard = async () => {
//   const isAdmin = await checkRole("admin");

//   if (!isAdmin) {
//     throw new Error("Access denied");
//   }

//   try {
//     await connectToDatabase();
//     const appointments = await appointmentModel.find({});
//     const users = await User.find({});

//     return {
//       success: true,
//       message: "Successfully",
//       data: {
//         appointments,
//         users,
//       },
//     };
//   } catch (error) {
//     handleError(error);
//   }
// };

// export const cancelAppointment = async (appointmentId: string) => {
//   const isAdmin = await checkRole("admin");

//   if (!isAdmin) {
//     throw new Error("Access denied");
//   }
//   try {
//     await connectToDatabase();

//     const appointment = await appointmentModel.findByIdAndUpdate(
//       appointmentId,
//       {
//         cancelled: true,
//       }
//     );

//     return {
//       success: true,
//       message: "Cancel successfully",
//       data: JSON.parse(JSON.stringify(appointment)),
//     };
//   } catch (error) {
//     handleError(error);
//   }
// };

// export const createAdmin = async () => {
//   const isAdmin = await checkRole("admin");

//   if (!isAdmin) {
//     throw new Error("Access denied");
//   }

//   try {
//     await connectToDatabase();

//     const admin = await Administrator.create({
//       clerkUserId: "user_2pE5DFghLzTYR83vNMnfZreJOTo",
//       email: "emanuelmisaellopezperez@gmail.com",
//       name: "Emanuel Lopez",
//       imageUrl: "https://example.com/image.jpg",
//       availability: null,
//       phone: "092738985",
//     });

//     console.log("Administrador creado con éxito:", admin);
//     return admin;
//   } catch (error) {
//     console.error("Error al crear el administrador:", error);
//     handleError(error);
//   }
// };

export async function eventType(email:string) {
  try {
    await connectToDatabase();

    const event = await EventTypeModel.find({email})

    console.log(event)
  } catch (error) {
    console.error("Error al configurar la disponibilidad:", error);
    throw error;
  }
}
