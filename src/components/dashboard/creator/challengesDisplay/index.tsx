import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Challenge } from "@prisma/client";
import Link from "next/link";

interface Props {
  challenges: Challenge[];
}

const ChallengesDisplay: React.FC<Props> = ({ challenges }) => {
  return (
    <div className="flex flex-col gap-5 w-full">
      <h1 className="text-2xl">Your Challenges: {challenges.length}</h1>
      <div className="grid grid-flow-row grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {challenges.map((challenge) => (
          <Card key={challenge.id}>
            <CardHeader>
              <CardTitle>{challenge.name}</CardTitle>
              <CardDescription>{challenge.description || "No description test!"}</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href={`/dashboard/challenge/${challenge.slug}`} className={buttonVariants({ variant: "outline" })}>
                Edit
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ChallengesDisplay;
