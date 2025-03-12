"use client";
import { ApiResponse } from "@/lib/types/external/common";
import { PostResource } from "@/lib/types/external/postApi";
import { updateInteractions } from "./helper";

export function repostOptimisticData(response: ApiResponse<PostResource>) {
	return updateInteractions(response, "repost");
}

export function unrepostOptimisticData(response: ApiResponse<PostResource>) {
	return updateInteractions(response, "unrepost");
}
