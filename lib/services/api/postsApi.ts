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

	async function likePost() {
		if (!apiData) {
			throw new Error("Post is not available");
		}
		try {
			await mutate(likePostMutation(apiData), likePostOptions(apiData));
		} catch (error) {
			if (error instanceof Error) {
				throw new Error(`An error has occurred \n${error.message}`);
			} else {
				throw new Error(`An error has occurred`);
			}
		}
	}
	async function unlikePost() {
		if (!apiData) {
			throw new Error("Post is not available");
		}
		try {
			await mutate(unlikePostMutation(apiData), unlikePostOptions(apiData));
		} catch (error) {
			if (error instanceof Error) {
				throw new Error(`An error has occurred \n${error.message}`);
			} else {
				throw new Error(`An error has occurred`);
			}
		}
	}
	return { data: post, likePost, unlikePost, ...rest };
}
