import { db } from "@/db";
import { userClient } from "@/lib/safe-action";
import { GetChallengesSchema } from "@/types/actions/user/get";

export const getChallengesAction = userClient(
	GetChallengesSchema,
	async ({}, { userId }) => {
		const challenges = await db.challenge.findMany({
			where: {
				participants: {
					every: {
						userId: userId,
					},
				},
			},
			select: {
				name: true,
				slug: true,
				description: true,
			},
		});

		return challenges;
	},
);

import { z } from "zod";

export const getUserRoleAction = userClient(
	z.undefined,
	async (_, { userId }) => {
		const user = await db.user.findFirst({ where: { id: userId } });
		if (!user) throw new Error("User not found");
		return user.type;
	},
);
