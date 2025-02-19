import useSWR from "swr";
import { fetcher } from "../fetcher";
import { ResourceResponse } from "../types/ResourceResponse";
import { PostResource } from "../types/PostResource";

export function usePost(postId: number | string) {
	return useSWR<ResourceResponse<PostResource>>(
		`/api/posts/${postId.toString()}`,
		fetcher,
	);
}
