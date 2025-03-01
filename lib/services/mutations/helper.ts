import { ApiResponse } from "@/lib/types/external/common";
import { PostResource } from "@/lib/types/external/postApi";

export function updateInteractions(
	response: ApiResponse<PostResource>,
	type: "like" | "unlike" | "repost" | "unrepost",
): ApiResponse<PostResource> {
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
