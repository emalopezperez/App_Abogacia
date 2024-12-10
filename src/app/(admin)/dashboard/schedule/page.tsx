import { eventType } from "@/app/actions/admin.actions";
import { currentUser } from "@clerk/nextjs/server";

export default async function Page() {
  const res = await eventType("emagymlopez@gmail.com");

  return (
    <div>
      <h2 className="text-2xl mb-4 font-bold">Configuración de agenda</h2>
    </div>
  );
}
