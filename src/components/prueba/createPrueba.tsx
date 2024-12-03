"use client";

import { bookAppointment } from "@/app/actions/user.actions";

const CreatePrueba = () => {
  const idUser = "674f355b95b2e50af2d370db";
  const slotDate = "2025-11-18";
  const slotTime = "14:00 PM";
  const message = "pelo largoo";
  return (
    <div>
      <button
        onClick={() => bookAppointment(idUser, slotDate, slotTime, message)}>
        Click
      </button>
    </div>
  );
};

export default CreatePrueba;
