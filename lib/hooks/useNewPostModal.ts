import { useState } from "react";
import Post from "../types/domain/post";

export function useNewPostModal() {
	const [isOpen, setIsOpen] = useState(false);
	const [replyingTo, setReplyingTo] = useState<Post | undefined>(undefined);

	const closeModal = () => {
		setIsOpen(false);
	};

	const openModal = (post?: Post) => {
		setReplyingTo(post);
		setIsOpen(true);
	};

	return { isOpen, replyingTo, closeModal, openModal, setReplyingTo };
}
