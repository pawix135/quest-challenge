"use client";
import { createChallengeAction } from "@/actions/creator";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { handleClientError } from "@/lib/clientErrorHandler";
import { cn } from "@/lib/utils";
import { CreateChallengeForm, CreateChallengeFormSchema } from "@/types/forms/createChallenge";
import { zodResolver } from "@hookform/resolvers/zod";
import { format, addDays } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

interface Props {
  closeDialog: () => void;
}

const initialFormState: CreateChallengeForm = {
  name: "Pawix",
  description: "",
  eventDates: {
    from: new Date(),
    to: addDays(new Date(), 7),
  },
  inviteCode: "pawix code",
};

const AddChallengeForm: React.FC<Props> = ({ closeDialog }) => {
  const { toast } = useToast();
  const navigate = useRouter();

  const form = useForm<CreateChallengeForm>({
    resolver: zodResolver(CreateChallengeFormSchema),
    defaultValues: initialFormState,
  });

  const createChallenge = async (data: CreateChallengeForm) => {
    const response = await createChallengeAction(data);
    console.log(response.data);

    if (response.data) {
      closeDialog();
      navigate.push("/dashboard/challenge/" + response.data.slug);
    }

    handleClientError({ serverError: response.serverError, validationErrors: response.validationErrors }, toast);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(createChallenge)} className="space-y-3">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input autoComplete="false" placeholder="Challenge name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="inviteCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Invite code</FormLabel>
              <FormControl>
                <Input placeholder="Your invite code" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Challenge description..." rows={6} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="eventDates"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="date">Challange duration</FormLabel>
              <FormControl>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="date"
                      variant={"outline"}
                      className={cn(
                        "w-[300px] justify-start text-left font-normal ml-5",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {field.value.from ? (
                        field.value.to ? (
                          <>
                            {format(field.value.from, "LLL dd, y")} - {format(field.value.to, "LLL dd, y")}
                          </>
                        ) : (
                          format(field.value.from, "LLL dd, y")
                        )
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      initialFocus
                      mode="range"
                      defaultMonth={field.value.from}
                      selected={field.value}
                      onSelect={field.onChange}
                      onDayBlur={field.onBlur}
                      numberOfMonths={2}
                    />
                  </PopoverContent>
                </Popover>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Create new Challenge
        </Button>
        {/* <pre>{JSON.stringify(watch, null, 2)}</pre> */}
      </form>
    </Form>
  );
};

export default AddChallengeForm;
