import { ApiResponse } from "@/lib/types/external/common";
import { UserResource } from "@/lib/types/external/userApi";

export function followUserOptimisticData(
	response: ApiResponse<UserResource>,
): ApiResponse<UserResource> {
	const userInteractions = response.data.metadata.userInteractions;

	//TODO: clean up temp measure once the api provides the follow counts on every request
	//currently the counts are optional

	const followCounts = response.data.metadata.followCounts;
	if (!userInteractions || !followCounts) {
		return response;
	}
	const resShallowCopy: ApiResponse<UserResource> = {
		...response,
		data: {
			...response.data,
			metadata: {
				...response.data.metadata,
				followCounts: {
					...followCounts,
					followers: followCounts.followers + 1,
				},
				userInteractions: {
					...userInteractions,
					isFollowing: true,
					followedAt: new Date(),
				},
			},
		},
	};
	return resShallowCopy;
}

export function unfollowUserOptimisticData(
	response: ApiResponse<UserResource>,
): ApiResponse<UserResource> {
	const userInteractions = response.data.metadata.userInteractions;

	//TODO: clean up temp measure once the api provides the follow counts on every request
	//currently the counts are optional

	const followCounts = response.data.metadata.followCounts;
	if (!userInteractions || !followCounts) {
		return response;
	}
	const resShallowCopy: ApiResponse<UserResource> = {
		...response,
		data: {
			...response.data,
			metadata: {
				...response.data.metadata,
				followCounts: {
					...followCounts,
					followers: followCounts.followers - 1,
				},
				userInteractions: {
					...userInteractions,
					isFollowing: false,
					followedAt: null,
				},
			},
		},
	};
	return resShallowCopy;
}
