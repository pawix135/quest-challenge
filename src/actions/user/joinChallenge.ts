"use server";

import { db } from "@/db";
import { userClient } from "@/lib/safe-action";
import { InviteCodeFormSchema } from "@/types/forms/inviteCode";
import { redirect } from "next/navigation";

export const joinChallengeAction = userClient(InviteCodeFormSchema, async ({ inviteCode }, { userId }) => {
  try {
    const joined = await db.$transaction(async (ctx) => {
      const challenge = await ctx.challenge.findFirst({
        where: {
          invite_code: inviteCode,
        },
        select: {
          id: true,
          slug: true,
        },
      });

      if (!challenge) {
        throw new Error("Challenge not found");
      }

      const joined = await ctx.challengesOnUser.create({
        data: {
          userId: userId,
          challengeId: challenge.id,
        },
      });

      if (!joined) {
        throw Error("Failed to join challenge");
      }

      console.log("User joined the challenge");
      return challenge.slug;
    });

    redirect(`/dashboard/challenges/${joined}`);
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      return { failed: error.message };
    }
  }
});
