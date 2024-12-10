import { nylas } from "@/lib/nylas";
import { NextRequest } from "next/server";
import { nylasConfig } from "@/lib/nylas";
import { redirect } from "next/navigation";
import { checkRole } from "@/lib/roles";
import { connectToDatabase } from "@/lib/mongoose";
import { Administrator } from "@/lib/database/models/appointment.model";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { userId } = getAuth(request);

  const isAdmin = await checkRole("admin");

  if (!isAdmin) {
    return new NextResponse(JSON.stringify({ error: "Access denied" }), {
      status: 403,
    });
  }

  const url = new URL(request.url);
  const code = url.searchParams.get("code");

  if (!code) {
    return new NextResponse(JSON.stringify({ error: "No code provided" }), {
      status: 400,
    });
  }

  try {
    await connectToDatabase();

    const response = await nylas.auth.exchangeCodeForToken({
      clientSecret: nylasConfig.apiKey,
      clientId: nylasConfig.clientId,
      redirectUri: nylasConfig.redirectUri,
      code: code,
    });

    const { grantId, email } = response;

    await Administrator.updateOne(
      { clerkUserId: userId },
      { $set: { nylasGrantId: grantId, nylasEmail: email } }
    );
  } catch (error) {
    console.error(error);
    return new NextResponse(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500 }
    );
  }

  return redirect("/dashboard");
}
