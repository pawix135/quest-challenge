import { auth } from "@/auth";
import { createSafeActionClient } from "next-safe-action";

export const actionClient = createSafeActionClient();
export const userClient = createSafeActionClient({
  async middleware(parsedInput, data) {
    const session = await auth();

    if (!session) {
      throw new Error("User not authenticated");
    }

    return { userId: session.user.id };
  },
});
