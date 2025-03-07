"use client";
import { ApiResponse } from "@/lib/types/external/common";
import { PostResource } from "@/lib/types/external/postApi";
import { likePost, unlikePost } from "../api/birdApi";
import { handleInteractionMutation, updateInteractions } from "./helper";

export async function likePostMutation(response: ApiResponse<PostResource>) {
	return handleInteractionMutation({
		response: response,
		interactionType: "like",
		mutatorFn: likePost,
	});
}

export async function unlikePostMutation(response: ApiResponse<PostResource>) {
	return handleInteractionMutation({
		response: response,
		interactionType: "unlike",
		mutatorFn: unlikePost,
	});
}

export function likePostOptions(response: ApiResponse<PostResource>) {
	return {
		optimisticData: () => {
			return updateInteractions(response, "like");
		},
		revalidate: false,
	};
}

export function unlikePostOptions(response: ApiResponse<PostResource>) {
	return {
		optimisticData: () => {
			return updateInteractions(response, "unlike");
		},
		revalidate: false,
	};
}
