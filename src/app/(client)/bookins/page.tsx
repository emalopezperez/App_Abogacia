// "use client";

// import { createBooking } from "@/app/actions/admin.actions";

// export default function Page() {
//   const handleCreateBooking = async () => {
//     try {
//       const bookings = await createBooking({
//         eventId: "675c86d46ff8946813223d52",
//         eventDate: "2024-12-14",
//         fromTime: "10:30",
//         meetingLength: 60,
//         message: "Primeara iagenda ",
//       });
//       console.log("Booking created:", bookings);
//     } catch (error) {
//       console.error("Error creating booking:", error);
//     }
//   };

//   return (
//     <div>
//       <button onClick={handleCreateBooking}>Create Booking</button>
//     </div>
//   );
// }

export default function Page() {
  return (
    <div>
      <h1>Hello Page</h1>
    </div>
  );
}
