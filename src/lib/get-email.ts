"use server";

import { currentUser } from "@clerk/nextjs/server";

export const getEmail = async () => {
  const user = await currentUser();
  const email = user?.emailAddresses[0].emailAddress;
  return email;
};
