import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher(["/","/sign-in","/sign-up", "/api/webhooks/clerk"]);

const isAdminRoute = createRouteMatcher(["/dashboard(.*)"]);

const isMemberRoute = createRouteMatcher(["/client(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  const { userId, sessionClaims } = await auth();

  if (isPublicRoute(req)) {
    return NextResponse.next();
  }

  if (isAdminRoute(req)) {
    if (sessionClaims?.metadata?.role !== "admin") {
      const url = new URL("/", req.url);
      return NextResponse.redirect(url);
    }
  }

  // Validar rutas de miembro autenticado
  // if (isMemberRoute(req)) {
  //   if (!userId || sessionClaims?.metadata?.role !== "member") {
  //     const url = new URL("/", req.url);
  //     return NextResponse.redirect(url);
  //   }
  // }

  if (!userId) {
    const url = new URL("/", req.url);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
