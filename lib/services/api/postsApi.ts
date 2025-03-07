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
import { useState } from "react";

export function usePost(postId: number | string) {
	const [error, setError] = useState<Error | null>(null);
	const {
		data: apiData,
		mutate,
		isLoading,
		isValidating,
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
		if (apiData) {
			try {
				setError(null);
				await mutate(mutationFn(apiData), optionsFn(apiData));
			} catch (error) {
				if (error instanceof Error) {
					setError(new Error(`${error.message}`));
				} else {
					setError(new Error(`An error has occurred`));
				}
			}
		} else {
			setError(new Error("Post is not available"));
		}
	}

	async function likeToggle() {
		const isLiked = post?.interactions.isLiked;
		if (!isLiked) {
			await executeMutation(likePostMutation, likePostOptions);
		} else {
			await executeMutation(unlikePostMutation, unlikePostOptions);
		}
	}

	async function repostToggle() {
		const isReposted = post?.interactions.isReposted;
		if (!isReposted) {
			await executeMutation(repostPostMutation, repostPostOptions);
		} else {
			await executeMutation(unrepostPostMutation, unrepostPostOptions);
		}
	}
	return { post, likeToggle, repostToggle, error, isLoading, isValidating };
}
