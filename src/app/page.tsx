import { Button } from "@/components/ui/button";
import Image from "next/image";
import googleLogo from "../../public/google.svg";
import { signIn } from "@/auth";

export default function Home() {
  const signInWithGoogle = async () => {
    "use server";
    await signIn("google", { redirectTo: "/dashboard" });
  };

  return (
    <main className="min-h-screen grid place-items-center">
      <form action={signInWithGoogle}>
        <Button type="submit" className="flex flex-row gap-5">
          <Image src={googleLogo} alt="Google Logo" width={24} height={24} />
          Sign in with Google
        </Button>
      </form>
    </main>
  );
}
