"use client";

import { createBooking } from "@/app/actions/admin.actions";

export default function Page() {
  const handleCreateBooking = async () => {
    try {
      const bookings = await createBooking({
        eventId: "675ac3cc01d7e5406aff61e9",
        eventDate: "2024-01-01",
        fromTime: "10:30",
        meetingLength: 60,
        message: "Primeara iagenda ",
      });
      console.log("Booking created:", bookings);
    } catch (error) {
      console.error("Error creating booking:", error);
    }
  };

  return (
    <div>
      <button onClick={handleCreateBooking}>Create Booking</button>
    </div>
  );
}
