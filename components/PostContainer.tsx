import Post from "@/lib/types/domain/post";
import { useEffect } from "react";
import toast from "react-hot-toast";
import PostCard from "./ui/PostCard";

interface PostContainerProps {
	post: Post;
	onLikeToggle: () => Promise<void>;
	onRepostToggle: () => Promise<void>;
	onReply?: () => void;
	error: Error | null;
}

export default function PostContainer({
	post,
	onLikeToggle,
	onRepostToggle,
	onReply,
	error,
}: PostContainerProps) {
	useEffect(() => {
		if (error) {
			toast.error(error.message);
		}
	}, [error]);

	if (!post) return null;

	return (
		<>
			<PostCard
				key={post.id}
				post={post}
				onLike={onLikeToggle}
				onRepost={onRepostToggle}
				onReply={onReply}
			/>
		</>
	);
}
