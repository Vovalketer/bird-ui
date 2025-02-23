"use client";
import { ApiResponse } from "@/lib/types/external/common";
import { PostResource } from "@/lib/types/external/postApi";
import useSWR from "swr";
import { fetcher } from "../api/birdApi";
import { postResourceMapper } from "../mappers/postMapper";
import Post from "@/lib/types/domain/post";

export function usePostFetcher(postId: number | string) {
	const { data, ...rest } = useSWR<ApiResponse<PostResource>>(
		`/api/posts/${postId}`,
		fetcher,
	);
	let post: Post | undefined = undefined;
	if (data) {
		post = postResourceMapper(data);
	}
	return { data: post, rest };
}
