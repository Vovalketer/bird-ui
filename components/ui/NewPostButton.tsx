"use client";
import { useNewPostModal } from "@/context/NewPostModalContext";
import { useSession } from "next-auth/react";
import Button from "./Button";

export default function NewPostButton() {
	const { openModal } = useNewPostModal();
	const session = useSession();
	if (session.status === "unauthenticated" || session.status === "loading") {
		return null;
	}
	return (
		<div className="fixed bottom-4 right-4">
			<Button
				color="primary"
				onClick={() => {
					openModal();
				}}
			>
				+ Post
			</Button>
		</div>
	);
}
