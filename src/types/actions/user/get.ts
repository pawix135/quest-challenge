import { z } from "zod";

export const GetChallengesSchema = z.object({});

export type GetChallenges = z.infer<typeof GetChallengesSchema>;
