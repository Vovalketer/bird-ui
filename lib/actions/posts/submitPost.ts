"use server";

import { axiosClient } from "@/lib/services/api/birdApiServer";
import errorHandler from "@/lib/services/utils/errorHandler";
import { HttpResponse } from "@/lib/types/domain/http";
import { ApiResponse } from "@/lib/types/external/common";
import { CreatePostRequestSchema } from "@/lib/types/external/createPostRequest";
import { PostResource } from "@/lib/types/external/postApi";

export default async function submitPost(
	postData: unknown,
	postId?: number | string,
): Promise<HttpResponse<ApiResponse<PostResource>>> {
	const result = CreatePostRequestSchema.safeParse(postData);

	if (!result.success) {
		return {
			success: false,
			errors: result.error.issues.map((issue) => {
				return { cause: issue.path[0].toString(), message: issue.message };
			}),
		};
	}
	const url = postId ? `/api/posts/${postId}/replies` : "/api/posts";
	try {
		const serverResponse = await axiosClient.post<ApiResponse<PostResource>>(
			url,
			result.data,
		);
		return { success: true, response: serverResponse.data };
	} catch (error) {
		return errorHandler(error, "Failed to create post");
	}
}
