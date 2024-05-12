"use server";
import { signIn } from "@/auth";
import { db } from "@/db";
import { userClient } from "@/lib/safe-action";
import { SetupFormSchema } from "@/types/forms/setup";

export const setupAction = userClient(SetupFormSchema, async ({ type }, { userId }) => {
  const typeChanged = await db.user.update({
    data: { type: type },
    where: { id: userId },
    select: { id: true, type: true },
  });

  if (!typeChanged) {
    return {
      failure: "Failed to update user account type",
    };
  }

  await signIn("google", { redirect: true, redirectTo: "/dashboard" });

  return {
    success: "User account setup complete",
    ...typeChanged,
  };
});
