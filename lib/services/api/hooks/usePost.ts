"use client";
import Post from "@/lib/types/domain/post";
import { ApiResponse } from "@/lib/types/external/common";
import { PostResource } from "@/lib/types/external/postApi";
import toast from "react-hot-toast";
import useSWR from "swr";
import { useEffect, useState } from "react";
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
	const {
		data: apiData,
		mutate,
		isLoading: isLoadingInitialData,
		isValidating: isLoading,
	} = useSWR<ApiResponse<PostResource>>(`/api/posts/${postId}`, fetcher);
	const [post, setPost] = useState<Post | undefined>();

	useEffect(() => {
		if (apiData) {
			setPost(postResourceMapper(apiData));
		}
	}, [apiData]);

	async function executeMutation(
		optimisticDataFn: (
			data: ApiResponse<PostResource>,
		) => ApiResponse<PostResource>,
		mutationFn: (postId: number | string) => Promise<unknown>,
	) {
		if (apiData) {
			try {
				await mutate(optimisticDataFn(apiData), false);
				await mutationFn(apiData.data.id);
			} catch (error) {
				await mutate(apiData);
				if (error instanceof Error) {
					toast.error(`${error.message}`);
				} else {
					toast.error("An error has occurred");
				}
			}
		} else {
			toast.error({ message: "Post is not available" });
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
		isLoadingInitialData,
		isLoading,
	};
}
