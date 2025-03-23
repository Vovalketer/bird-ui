import { useInfinitePosts } from "./useInfinitePosts";

export function useUserInfinitePosts(username: string, tab?: string) {
	return useInfinitePosts(`/api/users/${username}/${tab}`);
}
