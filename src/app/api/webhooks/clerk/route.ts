import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { createUser } from "@/app/actions/user.actions";

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    console.error("CLERK_WEBHOOK_SECRET is not defined in .env");
    return new Response("Internal server error", { status: 500 });
  }

  // Obtener encabezados del request
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    console.error("Missing required svix headers");
    return new Response("Missing required headers", { status: 400 });
  }

  // Obtener y verificar el cuerpo del webhook
  const payload = await req.json();
  const body = JSON.stringify(payload);
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Invalid webhook signature", { status: 400 });
  }

  // Manejar diferentes tipos de eventos
  const eventType = evt.type;

  if (eventType === "user.created") {
    const { id, email_addresses, first_name, last_name, image_url } = evt.data;

    if (!id || !email_addresses || email_addresses.length === 0) {
      console.error("Invalid user data received from Clerk");
      return new Response("Invalid user data", { status: 400 });
    }

    // Crear objeto de usuario
    const user = {
      clerkUserId: id,
      email: email_addresses[0].email_address,
      userName: `${first_name || ""} ${last_name || ""}`.trim(),
      image: image_url || "",
    };

    try {
      await createUser(user);
      console.log("User created successfully:", user);
    } catch (error) {
      console.error("Error creating user in database:", error);
      return new Response("Error creating user", { status: 500 });
    }
  } else {
    console.log(`Unhandled event type: ${eventType}`);
    return new Response("Event type not handled", { status: 200 });
  }

  return new Response("Webhook processed successfully", { status: 200 });
}
