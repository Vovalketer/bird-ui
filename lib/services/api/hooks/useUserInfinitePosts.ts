import { ApiResponse } from "@/lib/types/external/common";
import { PostResource } from "@/lib/types/external/postApi";
import { useState } from "react";
import useSWRInfinite from "swr/infinite";
import { postArrayResourceMapper } from "../../mappers/postMapper";
import {
	likePageOptimisticData,
	unlikePageOptimisticData,
} from "../../mutations/likePost";
import {
	repostPageOptimisticData,
	unrepostPageOptimisticData,
} from "../../mutations/repost";
import { fetcher, likePost, repost, unlikePost, unrepost } from "../birdApi";

export function useUserInfinitePosts(username: string) {
	const [error, setError] = useState<Error | null>(null);
	const { data, size, setSize, mutate, isValidating, isLoading } =
		useSWRInfinite<ApiResponse<PostResource[]>>(
			(pageIndex, previousPageData: ApiResponse<PostResource[]>) => {
				if (previousPageData && previousPageData.metadata.pagination.last) {
					return null;
				}
				return `/api/users/${username}/posts?page=${pageIndex}&limit=10`;
			},
			fetcher,
			{ initialSize: 1 },
		);

	async function executeMutation(
		optimisticDataFn: (
			data: ApiResponse<PostResource[]>[],
			postId: number | string,
		) => ApiResponse<PostResource[]>[],
		mutationFn: (postId: number | string) => Promise<unknown>,
		postId: number | string,
	) {
		if (data) {
			try {
				await mutate(optimisticDataFn(data, postId), false);
				await mutationFn(postId);
			} catch (error) {
				if (error instanceof Error) {
					setError(new Error(`${error.message}`));
				} else {
					setError(new Error(`An error has occurred`));
				}
			}
		}
	}

	const posts = data?.flatMap((page) => postArrayResourceMapper(page));

	async function likeToggle(postId: string | number) {
		const isLiked = posts?.find((post) => post.id === postId)?.interactions
			.isLiked;
		if (!isLiked) {
			await executeMutation(likePageOptimisticData, likePost, postId);
		} else {
			await executeMutation(unlikePageOptimisticData, unlikePost, postId);
		}
	}

	async function repostToggle(postId: string | number) {
		const isReposted = posts?.find((post) => post.id === postId)?.interactions
			.isReposted;
		if (!isReposted) {
			await executeMutation(repostPageOptimisticData, repost, postId);
		} else {
			await executeMutation(unrepostPageOptimisticData, unrepost, postId);
		}
	}

	return {
		posts,
		error,
		size,
		setSize,
		likeToggle,
		repostToggle,
		isValidating,
		isLoading,
	};
}
