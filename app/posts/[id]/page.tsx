"use client";
import PostContainer from "@/components/PostContainer";
import NewPostModal from "@/components/ui/NewPostModal";
import useModal from "@/lib/hooks/useModal";
import usePost from "@/lib/services/api/hooks/usePost";
import { useParams } from "next/navigation";

export default function Post() {
	const { id } = useParams();
	const { post, likeToggle, repostToggle, error } = usePost(id as string);
	const { isOpen, showModal, closeModal } = useModal();

	if (!post) return null;
	return (
		<>
			<NewPostModal isOpen={isOpen} onClose={closeModal} post={post} />
			<PostContainer
				post={post}
				onLikeToggle={likeToggle}
				onRepostToggle={repostToggle}
				onReply={showModal}
				error={error}
			/>
		</>
	);
}
