"use client";

import React from "react";
import { deletePostAction } from "../actions";
import { UserIcon } from "lucide-react";

import { Popover, PopoverTrigger, PopoverContent, Button } from "@heroui/react";
type DeleteButtonProps = {
	postId: string;
	children: React.ReactNode;
};

const DeleteButton: React.FC<DeleteButtonProps> = ({ postId }) => {
	return (
		<Popover>
			<PopoverTrigger>
				<Button color="danger" variant="bordered">
					Usuń wpis
				</Button>
			</PopoverTrigger>
			<PopoverContent>
				<div className="p-4">
					<p>Czy na pewno chcesz usunąć wpis?</p>
					<div className="flex justify-end gap-2 mt-2">
						<Button color="danger" onClick={() => deletePostAction(postId)}>
							Tak
						</Button>
						<Button variant="bordered">Nie</Button>
					</div>
				</div>
			</PopoverContent>
		</Popover>
	);
};

export default DeleteButton;
