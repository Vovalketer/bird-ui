"use client";
import { useNewPostModal } from "@/context/NewPostModalContext";
import PrimaryButton from "./base/PrimaryButton";

interface NewPostButtonProps {
	fixedPosition?: boolean;
}
export default function NewPostButton({ fixedPosition }: NewPostButtonProps) {
	const { openModal } = useNewPostModal();
	return fixedPosition ? (
		<div className="fixed bottom-4 right-4">
			<PrimaryButton
				onClick={() => {
					openModal();
				}}
			>
				+ Post
			</PrimaryButton>
		</div>
	) : (
		<PrimaryButton
			onClick={() => {
				openModal();
			}}
		>
			+ Post
		</PrimaryButton>
	);
}
