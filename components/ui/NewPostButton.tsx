"use client";
import { useNewPostModal } from "@/context/NewPostModalContext";
import PrimaryButton from "./base/PrimaryButton";
import { useSession } from "next-auth/react";

export default function NewPostButton() {
	const { openModal } = useNewPostModal();
	const session = useSession();
	if (session.status === "unauthenticated" || session.status === "loading") {
		return null;
	}
	return (
		<div className="fixed bottom-4 right-4">
			<PrimaryButton
				onClick={() => {
					openModal();
				}}
			>
				+ Post
			</PrimaryButton>
		</div>
	);
}
