"use client";
import InfiniteList from "@/components/InfiniteList";
import PostContainer from "@/components/PostContainer";
import Divider from "@/components/ui/Divider";
import NewPostButton from "@/components/ui/NewPostButton";
import PostComposer from "@/components/ui/PostComposer";
import PostView from "@/components/ui/PostView";
import { useNewPostModal } from "@/context/NewPostModalContext";
import useReplies from "@/lib/services/api/hooks/useReplies";
import { useParams } from "next/navigation";

export default function Post() {
	const { id } = useParams();
	const {
		posts: replies,
		likeToggle: replyLikeToggle,
		repostToggle: replyRepostToggle,
		isLoading,
		loadMore,
		hasMore,
	} = useReplies(id as string);
	const { openModal } = useNewPostModal();

	//TODO: if the post is a reply, show the parent post
	return (
		<div className="flex flex-col gap-y-4">
			<PostContainer id={id as string} />
			<PostComposer replyingToPostId={id as string} />
			<Divider />
			<InfiniteList
				onLoadMore={loadMore}
				isLoading={isLoading}
				hasMore={hasMore}
			>
				{replies?.map((reply) => (
					<PostView
						key={reply.id}
						post={reply}
						onLike={() => replyLikeToggle(reply.id)}
						onRepost={() => replyRepostToggle(reply.id)}
						onReply={() => openModal(reply)}
					/>
				))}
			</InfiniteList>
			<NewPostButton />
		</div>
	);
}
