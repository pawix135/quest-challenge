import { auth } from "@/auth";
import CreatorDashboard from "@/components/pages/creatorDashboard";
import UserDashboard from "@/components/pages/userDashboard";
import { Role } from "@prisma/client";
import { redirect } from "next/navigation";

export default async function Dashboard() {
	const session = await auth();
	const user = session!.user;

	// Redirect to the setup page to complete the account setup
	if (user.accountType === "SETUP") redirect("/dashboard/setup");

	return (
		<main className="container flex p-5">
			{user.accountType == Role.USER && <UserDashboard />}
			{user.accountType == Role.CREATOR && <CreatorDashboard />}
		</main>
	);
}
