import { ApiResponse } from "@/lib/types/external/common";
import { PostResource } from "@/lib/types/external/postApi";
import { useCallback, useEffect, useState } from "react";
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
import toast from "react-hot-toast";
import Post from "@/lib/types/domain/post";

export function useInfinitePosts(url: string) {
	const {
		data,
		setSize,
		mutate,
		isValidating: isLoading,
		isLoading: isLoadingInitialData,
	} = useSWRInfinite<ApiResponse<PostResource[]>>(
		(pageIndex, previousPageData: ApiResponse<PostResource[]>) => {
			if (previousPageData && previousPageData.metadata.pagination.last) {
				setHasMore(false);
				return null;
			} else {
				return `${url}?page=${pageIndex}&limit=3`;
			}
		},
		fetcher,
		{ initialSize: 1 },
	);
	const [hasMore, setHasMore] = useState(true);
	const [posts, setPosts] = useState<Post[] | undefined>();

	useEffect(() => {
		if (data) {
			setPosts(data.flatMap((page) => postArrayResourceMapper(page)));
		}
	}, [data]);

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
					toast.error(`${error.message}`);
				} else {
					toast.error({ message: "An error has occurred" });
				}
			}
		}
	}

	const loadMore = useCallback(() => {
		if (!isLoading) setSize((prevSize) => prevSize + 1);
	}, [isLoading, setSize]);

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
		loadMore,
		likeToggle,
		repostToggle,
		hasMore,
		isLoading,
		isLoadingInitialData,
	};
}
