import { auth } from "@/auth";
import InviteCard from "@/components/dashboard/joinForm";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await auth();

  // Redirect to the setup page to complete the account setup
  if (session!.user.accountType === "SETUP") redirect("/dashboard/setup");

  return (
    <main className="container flex justify-center p-5">
      <InviteCard />
    </main>
  );
}
