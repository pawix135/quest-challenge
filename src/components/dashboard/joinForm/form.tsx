"use client";

import { joinChallengeAction } from "@/actions/user/joinChallenge";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { InviteCodeForm as TInviteCodeForm, InviteCodeFormSchema } from "@/types/forms/inviteCode";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

interface Props {}

const InviteCodeForm: React.FC<Props> = () => {
  const form = useForm<TInviteCodeForm>({
    resolver: zodResolver(InviteCodeFormSchema),
    defaultValues: {
      inviteCode: "",
    },
  });

  const join = async (data: TInviteCodeForm) => {
    const response = await joinChallengeAction(data);
    console.log(response);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(join)} className="space-y-3">
        <FormField
          control={form.control}
          name="inviteCode"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="ts-react-schedule" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Join!
        </Button>
      </form>
    </Form>
  );
};

export default InviteCodeForm;
