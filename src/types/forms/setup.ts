import { Role } from "@prisma/client";
import { z } from "zod";

export const SetupFormSchema = z.object({
  type: z.enum([Role.CREATOR, Role.USER]),
});

export type SetupForm = z.infer<typeof SetupFormSchema>;
