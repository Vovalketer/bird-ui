import {
	CreatePostRequest,
	CreatePostRequestSchema,
} from "@/lib/types/external/createPostRequest";
import { axiosClient } from "./birdApi";
import { ApiResponse } from "@/lib/types/external/common";
import { PostResource } from "@/lib/types/external/postApi";

export async function postReply(
	postId: number | string,
	content: CreatePostRequest,
) {
	const parsedContent = CreatePostRequestSchema.safeParse(content);
	if (!parsedContent.success) {
		throw new Error("Invalid content format");
	}
	const res = await axiosClient.post<ApiResponse<PostResource>>(
		`/api/posts/${postId}/replies`,
		content,
	);

	return res.data;
}
