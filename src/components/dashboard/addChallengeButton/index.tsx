"use client";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import AddChallengeForm from "./form";
import { useCallback, useState } from "react";

interface Props {}

const AddChallengeButton: React.FC<Props> = () => {
	const [open, setOpen] = useState<boolean>(false);

	const closeDialog = useCallback(() => {
		setOpen(false);
	}, []);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button>
					Add challenge
					<Plus size={32} />
				</Button>
			</DialogTrigger>
			<DialogContent className="">
				<DialogHeader>
					<DialogTitle>Create new Challenge</DialogTitle>
					<DialogDescription>
						Fill the form below to create initial challenge settings.
					</DialogDescription>
					<AddChallengeForm closeDialog={closeDialog} />
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
};

export default AddChallengeButton;
