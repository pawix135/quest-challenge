import { auth } from "@/auth";
import CreatorDashboard from "@/components/pages/creatorDashboard";
import UserDashboard from "@/components/pages/userDashboard";
import { Role } from "@prisma/client";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await auth();

  // Redirect to the setup page to complete the account setup
  if (session!.user.accountType === "SETUP") redirect("/dashboard/setup");

  const user = session!.user;

  return (
    <main className="container flex p-5">
      {user.accountType == Role.USER && <UserDashboard />}
      {user.accountType == Role.CREATOR && <CreatorDashboard />}
    </main>
  );
}
