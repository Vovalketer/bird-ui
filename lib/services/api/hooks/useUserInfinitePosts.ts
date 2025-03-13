import { useInfinitePosts } from "./useInfinitePosts";

export function useUserInfinitePosts(username: string) {
	return useInfinitePosts(`/api/users/${username}/posts`);
}
