import Post from "@/lib/types/domain/post";
import { ApiResponse } from "@/lib/types/external/common";
import { PostResource } from "@/lib/types/external/postApi";
import { userMapper } from "./userMapper";
import { mediaMapper } from "./mediaMapper";
import { UserResource } from "@/lib/types/external/userApi";
import { MediaResource } from "@/lib/types/external/mediaApi";

export function postResourceMapper(response: ApiResponse<PostResource>): Post {
	const apiUser = response.included?.users?.find(
		(user) => user.id === response.data.relationships.user.data.id,
	);
	if (!apiUser) throw new Error("User not found");

	const mediaIds = response.data.relationships.media?.data.map((m) => m.id);
	const includedMedia = response.included?.media;
	const apiMedia = includedMedia?.filter((media) =>
		mediaIds?.includes(media.id),
	);

	return postMapper(response.data, apiUser, apiMedia);
}
function postMapper(
	postResource: PostResource,
	userResource: UserResource,
	mediaResources?: MediaResource[],
): Post {
	const user = userMapper(userResource);
	const media = mediaResources ? mediaMapper(mediaResources) : undefined;
	return {
		id: postResource.id,
		text: postResource.attributes.text,
		replyType: postResource.attributes.replyType,
		createdAt: postResource.attributes.createdAt,
		interactions: {
			repliesCount: postResource.metadata.metrics.repliesCount,
			repostsCount: postResource.metadata.metrics.repostsCount,
			likesCount: postResource.metadata.metrics.likesCount,
			isLiked: postResource.metadata.userInteractions.isLiked,
			isReposted: postResource.metadata.userInteractions.isReposted,
		},
		user: user,
		media: media,
	};
}
