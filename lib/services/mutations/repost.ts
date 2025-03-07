"use client";
import { ApiResponse } from "@/lib/types/external/common";
import { PostResource } from "@/lib/types/external/postApi";
import { repost, unrepost } from "../api/birdApi";
import { handleInteractionMutation, updateInteractions } from "./helper";

export async function repostPostMutation(response: ApiResponse<PostResource>) {
	return handleInteractionMutation({
		response: response,
		interactionType: "repost",
		mutatorFn: repost,
	});
}

export async function unrepostPostMutation(
	response: ApiResponse<PostResource>,
) {
	return handleInteractionMutation({
		response: response,
		interactionType: "unrepost",
		mutatorFn: unrepost,
	});
}

export function repostPostOptions(response: ApiResponse<PostResource>) {
	return {
		optimisticData: () => {
			return updateInteractions(response, "repost");
		},
		revalidate: false,
	};
}
export function unrepostPostOptions(response: ApiResponse<PostResource>) {
	return {
		optimisticData: () => {
			return updateInteractions(response, "unrepost");
		},
		revalidate: false,
	};
}
