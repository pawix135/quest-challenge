import { ToastProps } from "@/components/ui/toast";
import { ToasterToastProps } from "@/components/ui/use-toast";

type Errors = {
  serverError: any;
  validationErrors: any;
};

export const handleClientError = ({ serverError, validationErrors }: Errors, toast: (props: any) => void) => {
  if (serverError || validationErrors)
    toast({ variant: "destructive", title: "Something went wrong", description: serverError || validationErrors });
};
