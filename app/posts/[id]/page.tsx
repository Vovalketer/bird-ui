"use client";
import NewPostModal from "@/components/ui/NewPostModal";
import useModal from "@/lib/hooks/useModal";
import PostCard from "@/components/ui/PostCard";
import usePost from "@/lib/services/api/hooks/usePost";
import { useParams } from "next/navigation";

export default function Post() {
	const { id } = useParams();
	const { isOpen, showModal, closeModal } = useModal();
	const { post, likeToggle, repostToggle } = usePost(id as string);

	if (!post) return null;
	return (
		<>
			<NewPostModal isOpen={isOpen} onClose={closeModal} post={post} />
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
