import { WebhookEvent } from "@clerk/nextjs/server";
import { Webhook } from "svix";
import { createUser, deleteUser } from "@/app/actions/user.actions";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  const headerPayload = await req.headers;
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", { status: 400 });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);

  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent; // Definimos evt como WebhookEvent

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent; // Afirmación de tipo
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", { status: 400 });
  }

  const { id } = evt.data;
  const eventType = evt.type;

  if (eventType === "user.created") {
    const { id, email_addresses, image_url, first_name, last_name, username } = evt.data;

    const user = {
      clerkId: id,
      email: email_addresses[0].email_address,
      username: username!,
      firstName: first_name,
      lastName: last_name,
      photo: image_url,
    };

    const newUser = await createUser(user);

    if (newUser) {
      // Set metadata (using your user management logic)
      // You can call your DB logic here
    }

    return NextResponse.json({ message: "OK", user: newUser });
  }

  if (eventType === "user.deleted") {
    const { id } = evt.data;
    const deletedUser = await deleteUser(id!);
    return NextResponse.json({ message: "OK", user: deletedUser });
  }

  return new Response("", { status: 200 });
}
