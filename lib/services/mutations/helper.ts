import { ApiResponse } from "@/lib/types/external/common";
import { ErrorResponse } from "@/lib/types/external/error";
import { PostResource } from "@/lib/types/external/postApi";
import { AxiosError, isAxiosError } from "axios";

export function updateInteractions(
	response: ApiResponse<PostResource>,
	type: "like" | "unlike" | "repost" | "unrepost",
): ApiResponse<PostResource> {
	if (!response.data.metadata.userInteractions) return response;
	const res = {
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
	switch (type) {
		case "like":
			res.data.metadata.metrics.likesCount =
				response.data.metadata.metrics.likesCount + 1;
			res.data.metadata.userInteractions.isLiked = true;
			break;
		case "unlike":
			res.data.metadata.metrics.likesCount =
				response.data.metadata.metrics.likesCount - 1;
			res.data.metadata.userInteractions.isLiked = false;
			break;
		case "repost":
			res.data.metadata.metrics.repostsCount =
				response.data.metadata.metrics.repostsCount + 1;
			res.data.metadata.userInteractions.isReposted = true;
			break;
		case "unrepost":
			res.data.metadata.metrics.repostsCount =
				response.data.metadata.metrics.repostsCount - 1;
			res.data.metadata.userInteractions.isReposted = false;
			break;
		default:
			break;
	}
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
	//emulate response as per SWR's needs, perhaps we could just refetch later

	return updateInteractions(response, interactionType);
}
