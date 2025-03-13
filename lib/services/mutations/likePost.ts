"use client";
import { ApiResponse } from "@/lib/types/external/common";
import { PostResource } from "@/lib/types/external/postApi";
import { updateInteractions, updatePageInteractions } from "./helper";

export function likeOptimisticData(response: ApiResponse<PostResource>) {
	return updateInteractions(response, "like");
}

export function unlikeOptimisticData(response: ApiResponse<PostResource>) {
	return updateInteractions(response, "unlike");
}

export function likePageOptimisticData(
	response: ApiResponse<PostResource[]>[],
	postId: number | string,
) {
	return response.map((page) => updatePageInteractions(page, postId, "like"));
}

export function unlikePageOptimisticData(
	response: ApiResponse<PostResource[]>[],
	postId: number | string,
) {
	return response.map((page) => updatePageInteractions(page, postId, "unlike"));
}
