import { auth } from "@/auth";
import AccountSetup from "@/components/accountSetup";
import { redirect } from "next/navigation";

export default async function SetupPage() {
  const session = await auth();

  if (session!.user.accountType !== "SETUP") {
    redirect("/dashboard");
  }

  return (
    <main className="min-h-screen grid place-items-center">
      <div className="space-y-5">
        <div>
          <h1 className="text-3xl">Setup your acconut</h1>
          <p className="text-primary/50">Do you want to create Challenges or Join them? </p>
        </div>
        <AccountSetup />
      </div>
    </main>
  );
}
