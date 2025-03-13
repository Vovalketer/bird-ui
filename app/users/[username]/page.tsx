"use client";
import InfiniteList from "@/components/InfiniteList";
import NewPostModal from "@/components/ui/NewPostModal";
import PostCard from "@/components/ui/PostCard";
import useModal from "@/lib/hooks/useModal";
import { useUserInfinitePosts } from "@/lib/services/api/hooks/useUserInfinitePosts";
import { useParams } from "next/navigation";

export default function UserPage() {
	// user bgaynor5h has 10 posts
	const { username } = useParams();
	const { posts, likeToggle, repostToggle, loadMore, hasMore, isLoading } =
		useUserInfinitePosts(username as string);
	const { isOpen, showModal, closeModal } = useModal();

	const handleLike = (postId: string | number) => {
		likeToggle(postId);
	};

	const handleRepost = (postId: string | number) => {
		repostToggle(postId);
	};
	return (
		<>
			<NewPostModal isOpen={isOpen} onClose={closeModal} />
			<InfiniteList
				onLoadMore={loadMore}
				isLoading={isLoading}
				hasMore={hasMore}
			>
				{posts?.map((post) => (
					<PostCard
						key={post.id}
						post={post}
						onLike={() => handleLike(post.id)}
						onRepost={() => handleRepost(post.id)}
						onReply={showModal}
					/>
				))}
			</InfiniteList>
		</>
	);
}
