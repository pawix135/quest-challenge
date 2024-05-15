import { getChallengesAction } from "@/actions/user";
import InviteCard from "@/components/dashboard/joinForm";

interface Props {}

const UserDashboard: React.FC<Props> = async () => {
	const challenges = await getChallengesAction({});
	console.log(challenges);

	return (
		<>
			<InviteCard />
		</>
	);
};

export default UserDashboard;
