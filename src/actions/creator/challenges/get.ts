"use server";

import { db } from "@/db";
import { CreatorError } from "@/errors/actions";
import { creatorClient } from "@/lib/safe-action";
import { GetChallengesSchema } from "@/types/actions/creator/get";

export const getChallengesAction = creatorClient(
	GetChallengesSchema,
	async ({}, { userId }) => {
		try {
			const challenges = await db.challenge.findMany({
				where: {
					creator: {
						every: {
							userId: userId,
						},
					},
				},
			});

			return challenges;
		} catch (error) {
			throw new CreatorError("Failed to get challenges!");
		}
	},
);
