"use client";
import NewPostModal from "@/components/ui/NewPostModal";
import PostCard from "@/components/ui/PostCard";
import { useNewPostModal } from "@/lib/hooks/useNewPostModal";
import usePost from "@/lib/services/api/hooks/usePost";
import { useParams } from "next/navigation";

export default function Post() {
	const { id } = useParams();
	const { post, likeToggle, repostToggle } = usePost(id as string);
	const { isOpen, openModal, closeModal, replyingTo } = useNewPostModal();

	if (!post) return null;
	return (
		<>
			<NewPostModal isOpen={isOpen} onClose={closeModal} post={replyingTo} />
			<PostCard
				key={post.id}
				post={post}
				onLike={likeToggle}
				onRepost={repostToggle}
				onReply={() => openModal(post)}
			/>
		</>
	);
}
