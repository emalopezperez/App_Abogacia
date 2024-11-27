import { Roles } from "@/types/globals";
import { auth } from "@clerk/nextjs/server";

export const checkRole = async (role: Roles): Promise<boolean> => {
  const { sessionClaims } = await auth();

  if (!sessionClaims?.metadata?.role) {
    return false;
  }

  return sessionClaims.metadata.role === role;
};
