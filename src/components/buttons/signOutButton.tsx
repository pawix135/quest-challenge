import { signOut } from "@/auth";
import { Button } from "../ui/button";
import { signOutAction } from "@/actions/auth";

interface Props {}

const SignOutButton: React.FC<Props> = () => {
  return (
    <form action={signOutAction}>
      <Button type="submit">Sign out</Button>
    </form>
  );
};

export default SignOutButton;
