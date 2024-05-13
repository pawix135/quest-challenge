import { z } from "zod";

export const GetChallengesSchema = z.object({
  count: z.number().optional(),
});

export type GetChallenges = z.infer<typeof GetChallengesSchema>;
