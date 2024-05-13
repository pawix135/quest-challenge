import { signOut } from "@/auth";

export const signOutAction = async () => {
  "use server";
  await signOut();
};
