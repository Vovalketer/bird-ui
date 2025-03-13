"use client";
import { ApiResponse } from "@/lib/types/external/common";
import { PostResource } from "@/lib/types/external/postApi";
import { updateInteractions, updatePageInteractions } from "./helper";

export function repostOptimisticData(response: ApiResponse<PostResource>) {
	return updateInteractions(response, "repost");
}

export function unrepostOptimisticData(response: ApiResponse<PostResource>) {
	return updateInteractions(response, "unrepost");
}

export function repostPageOptimisticData(
	response: ApiResponse<PostResource[]>[],
	postId: number | string,
) {
	return response.map((page) => updatePageInteractions(page, postId, "repost"));
}

export function unrepostPageOptimisticData(
	response: ApiResponse<PostResource[]>[],
	postId: number | string,
) {
	return response.map((page) =>
		updatePageInteractions(page, postId, "unrepost"),
	);
}
