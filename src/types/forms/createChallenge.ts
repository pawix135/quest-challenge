import { z } from "zod";

export const CreateChallengeFormSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  eventDates: z.object({
    from: z.date(),
    to: z.date(),
  }),
  inviteCode: z.string(),
});

export type CreateChallengeForm = z.infer<typeof CreateChallengeFormSchema>;
