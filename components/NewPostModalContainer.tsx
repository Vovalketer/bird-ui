"use client";
import { useNewPostModal } from "@/context/NewPostModalContext";
import NewPostModal from "./ui/NewPostModal";

export default function NewPostModalContainer() {
	const { isOpen, closeModal, replyingTo } = useNewPostModal();
	return (
		<NewPostModal isOpen={isOpen} onClose={closeModal} post={replyingTo} />
	);
}
