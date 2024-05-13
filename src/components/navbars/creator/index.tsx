import SignOutButton from "@/components/buttons/signOutButton";
import AddChallengeButton from "@/components/dashboard/addChallengeButton";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Settings } from "lucide-react";
import Link from "next/link";

interface Props {}

const CreatorNavbar: React.FC<Props> = () => {
  return (
    <header className="py-3 px-2 flex flex-row items-center w-full bg-secondary/30">
      <nav className="flex flex-row items-center justify-between w-full">
        <Link href={"/dashboard"} className="text-xl font-bold">
          Dashboard
        </Link>
        <div>
          <AddChallengeButton />
          <Popover>
            <PopoverTrigger asChild>
              <Button variant={"ghost"}>
                Settings <Settings />
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <SignOutButton />
            </PopoverContent>
          </Popover>
        </div>
      </nav>
    </header>
  );
};

export default CreatorNavbar;
