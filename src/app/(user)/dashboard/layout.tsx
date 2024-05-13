import { auth } from "@/auth";
import CreatorNavbar from "@/components/navbars/creator";
import { Toaster } from "@/components/ui/toaster";
import { Role } from "@prisma/client";

interface Props extends React.PropsWithChildren {}

const DashboardLayout: React.FC<Props> = async ({ children }) => {
  const session = await auth();
  const user = session!.user;
  return (
    <>
      {user.accountType == Role.CREATOR && <CreatorNavbar />}
      {children}
      <Toaster />
    </>
  );
};

export default DashboardLayout;
