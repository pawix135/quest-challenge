import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import InviteCodeForm from "./form";

interface Props {}

const InviteCard: React.FC<Props> = () => {
  return (
    <Card className="max-h-min">
      <CardHeader>
        <CardTitle>Do you have invite code? Join the challenge!</CardTitle>
      </CardHeader>
      <CardContent>
        <InviteCodeForm />
      </CardContent>
    </Card>
  );
};

export default InviteCard;
