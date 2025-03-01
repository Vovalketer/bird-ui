"use client";
import { ApiResponse } from "@/lib/types/external/common";
import { PostResource } from "@/lib/types/external/postApi";
import { likePost, unlikePost } from "../api/birdApi";
import { AxiosError, isAxiosError } from "axios";
import { ErrorResponse } from "@/lib/types/external/error";
import { updateInteractions } from "./helper";

export async function likePostMutation(response: ApiResponse<PostResource>) {
	if (response.data.metadata.userInteractions.isLiked) {
		return response;
	}
	try {
		await likePost(response.data.id);
	} catch (error) {
		if (isAxiosError(error)) {
			const err: AxiosError<ErrorResponse> = error;
			if (err.status === 401) {
				// should offer a link to login
				throw new Error("The user is not authenticated");
			}
			throw new Error(err.message);
		}
	}
	//emulate response as per SWR's needs, perhaps we could just refetch later

	return updateInteractions(response, "like");
}

export async function unlikePostMutation(response: ApiResponse<PostResource>) {
	if (!response.data.metadata.userInteractions.isLiked) {
		return response;
	}
	try {
		await unlikePost(response.data.id);
	} catch (error) {
		if (isAxiosError(error)) {
			const err: AxiosError<ErrorResponse> = error;
			if (err.status === 401) {
				// should offer a link to login
				throw new Error("The user is not authenticated");
			}
			throw new Error(err.message);
		}
	}
	//emulate response as per SWR's needs, perhaps we could just refetch later

	return updateInteractions(response, "unlike");
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
