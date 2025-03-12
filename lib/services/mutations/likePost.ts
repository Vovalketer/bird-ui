"use client";
import { ApiResponse } from "@/lib/types/external/common";
import { PostResource } from "@/lib/types/external/postApi";
import { updateInteractions } from "./helper";

export function likeOptimisticData(response: ApiResponse<PostResource>) {
	return updateInteractions(response, "like");
}

export function unlikeOptimisticData(response: ApiResponse<PostResource>) {
	return updateInteractions(response, "unlike");
}
