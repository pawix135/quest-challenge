import { getChallengesAction } from "@/actions/user";
import InviteCard from "@/components/dashboard/joinForm";
import ParticipantChallenges from "@/components/dashboard/participant/participantChallenges";

interface Props {}

const UserDashboard: React.FC<Props> = async () => {
	const challenges = await getChallengesAction({});

	return (
		<div className="flex flex-col gap-5 container">
			<InviteCard />
			<ParticipantChallenges challenges={challenges.data ?? []} />
		</div>
	);
};

export default UserDashboard;
