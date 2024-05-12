import { z } from "zod";

export const InviteCodeFormSchema = z.object({
  inviteCode: z.string(),
});

export type InviteCodeForm = z.infer<typeof InviteCodeFormSchema>;
