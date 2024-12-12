import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { createUser, deleteUser, updateUser } from "@/app/actions/user.actions";


export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occurred -- no svix headers", {
      status: 400,
    });
  }

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
    return new Response("Error occurred", {
      status: 400,
    });
  }

  const eventType = evt.type;
  if (eventType === "user.created") {
    const {
      id,
      email_addresses,
      image_url,
      first_name,
      last_name,
      username,
      phone_numbers,
    } = evt.data;

    const phone =
      phone_numbers && phone_numbers[0] ? phone_numbers[0].phone_number : null;

    const user = {
      clerkUserId: id,
      email: email_addresses[0].email_address,
      first_name,
      last_name,
      avatar: image_url,
      username,
      phone,
    };

    await createUser(user);
  }

  if (eventType === "user.updated") {
    const {
      id,
      email_addresses,
      image_url,
      first_name,
      last_name,
      username,
      phone_numbers,
    } = evt.data;

    const phone = phone_numbers?.[0]?.phone_number || null;
    const email = email_addresses?.[0]?.email_address || null;

    const updatedUser = {
      clerkUserId: id,
      email,
      first_name,
      last_name,
      avatar: image_url,
      username,
      phone,
    };

    await updateUser(updatedUser);

    return new Response("User deleted", { status: 200 });
  }

  if (eventType === "user.deleted") {
    const { id } = evt.data;

    if (!id) {
      return new Response("Error occurred -- missing user id", {
        status: 400,
      });
    }

    await deleteUser(id);

    return new Response("User deleted", { status: 200 });
  }

  return new Response("", { status: 200 });
}