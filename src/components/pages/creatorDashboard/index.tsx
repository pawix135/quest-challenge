import { getChallengesAction } from "@/actions/creator";
import ChallengesDisplay from "@/components/dashboard/creator/challengesDisplay";

interface Props {}

const CreatorDashboard: React.FC<Props> = async () => {
  const challenges = await getChallengesAction({});

  return (
    <>
      <ChallengesDisplay challenges={challenges?.data ?? []} />
    </>
  );
};

export default CreatorDashboard;
