"use server";

import { db } from "@/db";
import { Role } from "@prisma/client";

export const getUserRole = async (userId: string): Promise<Role> => {
  console.log(userId, "useri d");

  const user = await db.user.findFirst({ where: { id: userId } });
  if (!user) throw new Error("User not found");
  return user.type;
};
