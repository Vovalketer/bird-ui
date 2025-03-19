"use client";
import { useNewPostModal } from "@/context/NewPostModalContext";
import PrimaryButton from "./base/PrimaryButton";

export default function NewPostButton() {
	const { openModal } = useNewPostModal();
	return (
		<PrimaryButton
			onClick={() => {
				openModal();
			}}
		>
			+ Post
		</PrimaryButton>
	);
}
