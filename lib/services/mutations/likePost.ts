"use client";
import { ApiResponse } from "@/lib/types/external/common";
import { PostResource } from "@/lib/types/external/postApi";
import { likePost, unlikePost } from "../api/birdApi";
import { AxiosError, isAxiosError } from "axios";
import { ErrorResponse } from "@/lib/types/external/error";

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
	const updatedInteractions: ApiResponse<PostResource> = {
		...response,
		data: {
			...response.data,
			metadata: {
				...response.data.metadata,
				metrics: {
					...response.data.metadata.metrics,
					likesCount: response.data.metadata.metrics.likesCount + 1,
				},
				userInteractions: {
					...response.data.metadata.userInteractions,
					isLiked: true,
				},
			},
		},
	};
	return updatedInteractions;
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
	const updatedInteractions: ApiResponse<PostResource> = {
		...response,
		data: {
			...response.data,
			metadata: {
				...response.data.metadata,
				metrics: {
					...response.data.metadata.metrics,
					likesCount: response.data.metadata.metrics.likesCount - 1,
				},
				userInteractions: {
					...response.data.metadata.userInteractions,
					isLiked: false,
				},
			},
		},
	};
	return updatedInteractions;
}

export function likePostOptions(response: ApiResponse<PostResource>) {
	return {
		optimisticData: () => {
			const updatedInteractions: ApiResponse<PostResource> = {
				...response,
				data: {
					...response.data,
					metadata: {
						...response.data.metadata,
						metrics: {
							...response.data.metadata.metrics,
							likesCount: response.data.metadata.metrics.likesCount + 1,
						},
						userInteractions: {
							...response.data.metadata.userInteractions,
							isLiked: true,
						},
					},
				},
			};
			return updatedInteractions;
		},
		revalidate: false,
	};
}

export function unlikePostOptions(response: ApiResponse<PostResource>) {
	return {
		optimisticData: () => {
			const updatedInteractions: ApiResponse<PostResource> = {
				...response,
				data: {
					...response.data,
					metadata: {
						...response.data.metadata,
						metrics: {
							...response.data.metadata.metrics,
							likesCount: response.data.metadata.metrics.likesCount - 1,
						},
						userInteractions: {
							...response.data.metadata.userInteractions,
							isLiked: false,
						},
					},
				},
			};
			return updatedInteractions;
		},
		revalidate: false,
	};
}
