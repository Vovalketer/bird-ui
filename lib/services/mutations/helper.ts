import { ApiResponse } from "@/lib/types/external/common";
import { ErrorResponse } from "@/lib/types/external/error";
import { PostResource } from "@/lib/types/external/postApi";
import { AxiosError, isAxiosError } from "axios";

export function updateInteractions(
	response: ApiResponse<PostResource>,
	type: "like" | "unlike" | "repost" | "unrepost",
): ApiResponse<PostResource> {
	if (!response.data.metadata.userInteractions) return response;
	const res: ApiResponse<PostResource> = {
		...response,
		data: {
			...response.data,
			metadata: {
				...response.data.metadata,
				metrics: {
					...response.data.metadata.metrics,
				},
				userInteractions: {
					...response.data.metadata.userInteractions,
				},
			},
		},
	};
	const updatedPost = updatePostInteractions(res.data, type);
	res.data = updatedPost;
	return res;
}

function updatePostInteractions(
	post: PostResource,
	type: "like" | "unlike" | "repost" | "unrepost",
) {
	const { metrics, userInteractions } = post.metadata;
	if (!metrics || !userInteractions) return post;
	const copy: PostResource = {
		...post,
		metadata: {
			...post.metadata,
			metrics: { ...metrics },
			userInteractions: { ...userInteractions },
		},
	};
	const { metrics: metricsCopy, userInteractions: userInteractionsCopy } =
		copy.metadata;

	switch (type) {
		case "like":
			metricsCopy.likesCount += 1;
			userInteractionsCopy!.isLiked = true;
			break;
		case "unlike":
			metricsCopy.likesCount -= 1;
			userInteractionsCopy!.isLiked = false;
			break;
		case "repost":
			metricsCopy.repostsCount += 1;
			userInteractionsCopy!.isReposted = true;
			break;
		case "unrepost":
			metricsCopy.repostsCount -= 1;
			userInteractionsCopy!.isReposted = false;
			break;
		default:
			break;
	}
	return copy;
}

export function updatePageInteractions(
	response: ApiResponse<PostResource[]>,
	postId: number | string,
	type: "like" | "unlike" | "repost" | "unrepost",
) {
	const res: ApiResponse<PostResource[]> = {
		...response,
		data: response.data.map((post) => {
			if (post.id === postId) {
				return updatePostInteractions(post, type);
			}
			return post;
		}),
	};

	return res;
}

interface MutationProps {
	response: ApiResponse<PostResource>;
	interactionType: "like" | "unlike" | "repost" | "unrepost";
	mutatorFn: (postId: number | string) => Promise<unknown>;
}
export async function handleInteractionMutation({
	response,
	interactionType,
	mutatorFn,
}: MutationProps) {
	const userInteractions = response.data.metadata.userInteractions;
	if (!userInteractions) throw new Error("The user is not authenticated");
	try {
		await mutatorFn(response.data.id);
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

	return updateInteractions(response, interactionType);
}
