import { useInfinitePosts } from "./useInfinitePosts";

export default function useReplies(postId: string | number) {
	return useInfinitePosts(`/api/posts/${postId}/replies`);
}
