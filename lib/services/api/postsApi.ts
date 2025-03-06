"use client";
import { ApiResponse } from "@/lib/types/external/common";
import { PostResource } from "@/lib/types/external/postApi";
import useSWR from "swr";
import { fetcher } from "./birdApi";
import { postResourceMapper } from "../mappers/postMapper";
import Post from "@/lib/types/domain/post";
import {
	likePostMutation,
	likePostOptions,
	unlikePostMutation,
	unlikePostOptions,
} from "../mutations/likePost";
import {
	repostPostMutation,
	repostPostOptions,
	unrepostPostMutation,
	unrepostPostOptions,
} from "../mutations/repost";

export function usePost(postId: number | string) {
	const {
		data: apiData,
		mutate,
		...rest
	} = useSWR<ApiResponse<PostResource>>(`/api/posts/${postId}`, fetcher);
	let post: Post | undefined = undefined;
	if (apiData) {
		post = postResourceMapper(apiData);
	}

	async function executeMutation(
		mutationFn: (
			data: ApiResponse<PostResource>,
		) => Promise<ApiResponse<PostResource>>,
		optionsFn: (data: ApiResponse<PostResource>) => {
			revalidate: boolean;
			optimisticData: () => ApiResponse<PostResource>;
		},
	) {
		if (!apiData) {
			throw new Error("Post is not available");
		}
		try {
			await mutate(mutationFn(apiData), optionsFn(apiData));
		} catch (error) {
			if (error instanceof Error) {
				throw new Error(`An error has occurred \n${error.message}`);
			} else {
				throw new Error(`An error has occurred`);
			}
		}
	}

	async function toggleLike() {
		const isLiked = post?.interactions.isLiked;
		if (!isLiked) {
			await executeMutation(likePostMutation, likePostOptions);
		} else {
			await executeMutation(unlikePostMutation, unlikePostOptions);
		}
	}

	async function toggleRepost() {
		const isReposted = post?.interactions.isReposted;
		if (!isReposted) {
			await executeMutation(repostPostMutation, repostPostOptions);
		} else {
			await executeMutation(unrepostPostMutation, unrepostPostOptions);
		}
	}
	return { post, toggleLike, toggleRepost, ...rest };
}
