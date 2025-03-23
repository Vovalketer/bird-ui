"use client";
import InfiniteList from "@/components/InfiniteList";
import NewPostButton from "@/components/ui/NewPostButton";
import PostCard from "@/components/ui/PostCard";
import { useNewPostModal } from "@/context/NewPostModalContext";
import { useUserInfinitePosts } from "@/lib/services/api/hooks/useUserInfinitePosts";
import { useParams } from "next/navigation";

export default function UserPage() {
	// user bgaynor5h has 10 posts
	const { username } = useParams();
	const { posts, likeToggle, repostToggle, loadMore, hasMore, isLoading } =
		useUserInfinitePosts(username as string);
	const { openModal } = useNewPostModal();

	return (
		<>
			<InfiniteList
				onLoadMore={loadMore}
				isLoading={isLoading}
				hasMore={hasMore}
			>
				{posts?.map((post) => (
					<PostCard
						key={post.id}
						post={post}
						onLike={() => likeToggle(post.id)}
						onRepost={() => repostToggle(post.id)}
						onReply={() => openModal(post)}
					/>
				))}
			</InfiniteList>
			<NewPostButton />
		</>
	);
}
