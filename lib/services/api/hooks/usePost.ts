"use client";
import Post from "@/lib/types/domain/post";
import { ApiResponse } from "@/lib/types/external/common";
import { PostResource } from "@/lib/types/external/postApi";
import { useState } from "react";
import useSWR from "swr";
import { postResourceMapper } from "../../mappers/postMapper";
import {
	likeOptimisticData,
	unlikeOptimisticData,
} from "../../mutations/likePost";
import {
	repostOptimisticData,
	unrepostOptimisticData,
} from "../../mutations/repost";
import { fetcher, likePost, repost, unlikePost, unrepost } from "../birdApi";

export default function usePost(postId: number | string) {
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
		optimisticDataFn: (
			data: ApiResponse<PostResource>,
		) => ApiResponse<PostResource>,
		mutationFn: (postId: number | string) => Promise<unknown>,
	) {
		if (apiData) {
			try {
				setError(null);
				await mutate(optimisticDataFn(apiData), false);
				await mutationFn(apiData.data.id);
			} catch (error) {
				await mutate(apiData);
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
			await executeMutation(likeOptimisticData, likePost);
		} else {
			await executeMutation(unlikeOptimisticData, unlikePost);
		}
	}

	async function repostToggle() {
		const isReposted = post?.interactions.isReposted;
		if (!isReposted) {
			await executeMutation(repostOptimisticData, repost);
		} else {
			await executeMutation(unrepostOptimisticData, unrepost);
		}
	}

	return {
		post,
		likeToggle,
		repostToggle,
		error,
		isLoading,
		isValidating,
	};
}
