import usePost from "@/lib/services/api/hooks/usePost";
import PostView from "./ui/PostView";
import { useNewPostModal } from "@/context/NewPostModalContext";

interface PostContainerProps {
	id: number | string;
}
export default function PostContainer({ id }: PostContainerProps) {
	const { post, likeToggle, repostToggle } = usePost(id);
	const { openModal } = useNewPostModal();
	if (!post) return null;
	return (
		<>
			{post.parentId && <PostContainer id={post.parentId} />}
			<PostView
				key={post.id}
				post={post}
				onLike={likeToggle}
				onRepost={repostToggle}
				onReply={() => openModal(post)}
			/>
		</>
	);
}
