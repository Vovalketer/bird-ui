"use client";
import InfiniteList from "@/components/InfiniteList";
import NewPostButton from "@/components/ui/NewPostButton";
import PostCard from "@/components/ui/PostCard";
import { useNewPostModal } from "@/context/NewPostModalContext";
import usePost from "@/lib/services/api/hooks/usePost";
import useReplies from "@/lib/services/api/hooks/useReplies";
import { useParams } from "next/navigation";

export default function Post() {
	const { id } = useParams();
	const { post, likeToggle, repostToggle } = usePost(id as string);
	const {
		posts: replies,
		likeToggle: replyLikeToggle,
		repostToggle: replyRepostToggle,
		isLoading,
		loadMore,
		hasMore,
	} = useReplies(id as string);
	const { openModal } = useNewPostModal();

	if (!post) return null;
	return (
		<>
			<PostCard
				key={post.id}
				post={post}
				onLike={likeToggle}
				onRepost={repostToggle}
				onReply={() => openModal(post)}
			/>
			<InfiniteList
				onLoadMore={loadMore}
				isLoading={isLoading}
				hasMore={hasMore}
			>
				{replies?.map((reply) => (
					<PostCard
						key={reply.id}
						post={reply}
						onLike={() => replyLikeToggle(reply.id)}
						onRepost={() => replyRepostToggle(reply.id)}
						onReply={() => openModal(reply)}
					/>
				))}
			</InfiniteList>
		</>
	);
}
