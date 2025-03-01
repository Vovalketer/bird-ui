"use client";
import { ApiResponse } from "@/lib/types/external/common";
import { ErrorResponse } from "@/lib/types/external/error";
import { PostResource } from "@/lib/types/external/postApi";
import { AxiosError, isAxiosError } from "axios";
import { repost, unrepost } from "../api/birdApi";
import { updateInteractions } from "./helper";

export async function repostPostMutation(response: ApiResponse<PostResource>) {
	if (response.data.metadata.userInteractions.isReposted) {
		return response;
	}
	try {
		await repost(response.data.id);
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

	return updateInteractions(response, "repost");
}

export async function unrepostPostMutation(
	response: ApiResponse<PostResource>,
) {
	if (!response.data.metadata.userInteractions.isReposted) {
		return response;
	}
	try {
		await unrepost(response.data.id);
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
	return updateInteractions(response, "unrepost");
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
