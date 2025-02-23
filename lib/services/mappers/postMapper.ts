import Post from "@/lib/types/domain/post";
import { ApiResponse } from "@/lib/types/external/common";
import { PostResource } from "@/lib/types/external/postApi";
import { userMapper } from "./userMapper";
import { mediaMapper } from "./mediaMapper";

export function postResourceMapper(
	response: ApiResponse<PostResource>,
): Post | undefined {
	const apiUser = response.included?.users?.find(
		(user) => user.id === response.data.relationships.user.data.id,
	);
	const mediaIds = response.data.relationships.media?.data.map((m) => m.id);
	const includedMedia = response.included?.media;
	const apiMedia = includedMedia?.filter((media) =>
		mediaIds?.includes(media.id),
	);
	if (!apiUser) return;
	const user = userMapper(apiUser);
	const media = mediaMapper(apiMedia);

	return {
		id: response.data.id,
		text: response.data.attributes.text,
		replyType: response.data.attributes.replyType,
		createdAt: response.data.attributes.createdAt,
		interactions: {
			likesCount: response.data.metadata.interactions.likesCount,
			repostsCount: response.data.metadata.interactions.repostsCount,
			repliesCount: response.data.metadata.interactions.repliesCount,
			isLiked: response.data.metadata.interactions.isLiked,
			isReposted: response.data.metadata.interactions.isReposted,
		},
		user: user,
		media: media,
	};
}
