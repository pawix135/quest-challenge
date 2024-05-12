"use client";

import { SetupForm, SetupFormSchema } from "@/types/forms/setup";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Button } from "../ui/button";
import { setupAction } from "@/actions/user/setup";

interface Props {}

const AccountSetup: React.FC<Props> = () => {
  const form = useForm<SetupForm>({
    resolver: zodResolver(SetupFormSchema),
    defaultValues: {
      type: "USER",
    },
  });

  const setupAccount = async (values: SetupForm) => {
    try {
      const { data, serverError, validationErrors } = await setupAction(values);

      if (serverError || validationErrors) {
        console.log("Something went wrong", serverError, validationErrors);
        return;
      }

      console.log(data);
    } catch (error) {
      console.log(error, "lol error");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(setupAccount)} className="space-y-5">
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Account type</FormLabel>
              <FormControl className="">
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select account type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USER">User</SelectItem>
                    <SelectItem value="CREATOR">Creator</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" variant={"outline"} className="w-full">
          Done
        </Button>
      </form>
    </Form>
  );
};

export default AccountSetup;
