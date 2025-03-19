"use client";
import Post from "@/lib/types/domain/post";
import { createContext, useContext, useState } from "react";

interface NewPostModalContextProps {
	isOpen: boolean;
	setIsOpen: (isOpen: boolean) => void;
	replyingTo?: Post;
	setReplyingTo: (replyingTo: Post | undefined) => void;
	openModal: (post?: Post) => void;
	closeModal: () => void;
}
export const NewPostModalContext = createContext<
	NewPostModalContextProps | undefined
>(undefined);

export function NewPostModalProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [isOpen, setIsOpen] = useState(false);
	const [replyingTo, setReplyingTo] = useState<Post | undefined>(undefined);

	function closeModal() {
		setIsOpen(false);
	}
	function openModal(post?: Post) {
		setReplyingTo(post);
		setIsOpen(true);
	}

	return (
		<NewPostModalContext.Provider
			value={{
				isOpen,
				setIsOpen,
				replyingTo,
				setReplyingTo,
				openModal,
				closeModal,
			}}
		>
			{children}
		</NewPostModalContext.Provider>
	);
}

export function useNewPostModal() {
	const ctx = useContext(NewPostModalContext);
	if (!ctx) {
		throw new Error(
			"useNewPostModal must be used within a NewPostModalProvider",
		);
	}
	return ctx;
}
