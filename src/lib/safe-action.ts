import { auth } from "@/auth";
import { CreatorError } from "@/errors/actions";
import { SessionError } from "@/errors/session";
import { Role } from "@prisma/client";
import { DEFAULT_SERVER_ERROR, createSafeActionClient } from "next-safe-action";

export const actionClient = createSafeActionClient();
export const userClient = createSafeActionClient({
  async middleware() {
    const session = await auth();

    if (!session) {
      throw new Error("User not authenticated");
    }

    return { userId: session.user.id };
  },
});
export const creatorClient = createSafeActionClient({
  async middleware() {
    const session = await auth();

    if (!session) {
      throw new SessionError("User not authenticated");
    }

    if (session.user.accountType !== Role.CREATOR) {
      throw new CreatorError("You have to be a creator to perform this action!");
    }

    return { userId: session.user.id };
  },
  handleReturnedServerError(error) {
    if (error instanceof CreatorError || error instanceof SessionError) {
      return error.message;
    }
    return DEFAULT_SERVER_ERROR;
  },
});
