import ProgressSvg from "@/components/svgs/progressSvg";
import { buttonVariants } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Challenge } from "@prisma/client";
import Link from "next/link";

interface Props {
	challenges: Pick<Challenge, "name" | "slug" | "description">[];
}

{
	/*--size: 250px;
--half-size: calc(var(--size) / 2);
--stroke-width: 20px;
--radius: calc((var(--size) - var(--stroke-width)) / 2);
--circumference: calc(var(--radius) * pi * 2);
--dash: calc((var(--progress) * var(--circumference)) / 100);
  */
}

const ParticipantChallenges: React.FC<Props> = ({ challenges }) => {
	return (
		<div className="flex flex-col gap-5 w-full">
			<h1 className="text-2xl">Your Challenges: {challenges.length}</h1>
			<div className="grid grid-flow-row grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 w-full">
				{challenges.map((challenge) => (
					<Card key={challenge.slug}>
						<CardHeader>
							<CardTitle>{challenge.name}</CardTitle>
							<CardDescription>
								{challenge.description || "No description test!"}
							</CardDescription>
						</CardHeader>
						<CardContent className="flex flex-row justify-between items-center">
							<Link
								href={`/dashboard/challenge/${challenge.slug}`}
								className={buttonVariants({ variant: "outline" })}
							>
								Go
							</Link>
							<ProgressSvg progress={50} />
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	);
};

export default ParticipantChallenges;
