"use server";
import { db } from "@/db";
import { CreatorError } from "@/errors/actions";
import { creatorClient } from "@/lib/safe-action";
import { createChallengeSlug } from "@/lib/utils";
import { CreateChallengeFormSchema } from "@/types/forms/createChallenge";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const createChallengeAction = creatorClient(
	CreateChallengeFormSchema,
	async ({ description, eventDates, inviteCode, name }, { userId }) => {
		try {
			const challenge = await db.challenge.create({
				data: {
					name: name,
					dateFrom: eventDates.from,
					dateTo: eventDates.to,
					description: description,
					invite_code: inviteCode,
					slug: createChallengeSlug(name),
				},
				select: {
					id: true,
					slug: true,
				},
			});

			if (!challenge) {
				throw new CreatorError("Failed to create challenge");
			}

			await db.challengesOnCreators.create({
				data: {
					userId: userId,
					challengeId: challenge.id,
				},
			});

			revalidatePath("/dashboard");
			return challenge;
		} catch (error) {
			console.log(error);
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				if (error.code == "P2002") {
					const meta = error.meta as { target: string[] };
					if (meta.target.includes("invite_code")) {
						throw new CreatorError("Challenge invite code already exists!");
					}
				}
			}

			throw new CreatorError("Failed to create challenge");
		}
	},
);
