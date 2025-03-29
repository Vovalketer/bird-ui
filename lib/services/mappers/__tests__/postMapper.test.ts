import {
	postArrayResourceMapper,
	postResourceMapper,
} from "@/lib/services/mappers/postMapper";
import Post from "@/lib/types/domain/post";
import { ApiResponse } from "@/lib/types/external/common";
import { PostResource } from "@/lib/types/external/postApi";

describe("postMapper", () => {
	it("should map api response to domain post", () => {
		const mappedPost = postResourceMapper(apiPost);
		const expectedPost: Post = {
			id: 1,
			text: "testText",
			replyType: "EVERYONE",
			createdAt: "2023-01-01T00:00:00.000Z",
			user: {
				id: "785cdd7a-8d0e-4e9c-9f3f-3195e3eb1c42",
				username: "test",
				handle: "test",
				profileImage: "test",
				createdAt: "2023-01-01T00:00:00.000Z",
				bio: undefined,
				dateOfBirth: undefined,
				location: undefined,
				followersCount: 4,
				followingCount: 2,
				isFollowing: true,
				isFollowedBy: true,
			},
			media: undefined,
			parentId: 10,
			interactions: {
				likesCount: 1,
				repostsCount: 1,
				repliesCount: 1,
				isLiked: true,
				isReposted: true,
			},
		};
		expect(mappedPost).toEqual(expectedPost);
	});

	it("should map an api response containing an array of post resources to domain posts", () => {
		const posts = postArrayResourceMapper(apiPosts);
		const expectedPost1: Post = {
			id: 1,
			text: "testText",
			replyType: "EVERYONE",
			createdAt: "2023-01-01T00:00:00.000Z",
			user: {
				id: "785cdd7a-8d0e-4e9c-9f3f-3195e3eb1c42",
				username: "test",
				handle: "test",
				profileImage: "test",
				createdAt: "2023-01-01T00:00:00.000Z",
				bio: undefined,
				dateOfBirth: undefined,
				location: undefined,
				followersCount: 3,
				followingCount: 1,
				isFollowing: true,
				isFollowedBy: true,
			},
			media: undefined,
			parentId: 10,
			interactions: {
				likesCount: 1,
				repostsCount: 1,
				repliesCount: 1,
				isLiked: true,
				isReposted: true,
			},
		};
		const expectedPost2: Post = {
			id: 2,
			text: "testText",
			replyType: "EVERYONE",
			createdAt: "2023-01-01T00:00:00.000Z",
			user: {
				id: "785cdd7a-8d0e-4e9c-9f3f-3195e3eb1c42",
				username: "test",
				handle: "test",
				profileImage: "test",
				createdAt: "2023-01-01T00:00:00.000Z",
				bio: undefined,
				dateOfBirth: undefined,
				location: undefined,
				followersCount: 3,
				followingCount: 1,
				isFollowing: true,
				isFollowedBy: true,
			},
			media: undefined,
			parentId: 10,
			interactions: {
				likesCount: 1,
				repostsCount: 1,
				repliesCount: 1,
				isLiked: true,
				isReposted: true,
			},
		};
		expect(posts).toEqual([expectedPost1, expectedPost2]);
	});
});

const postResource1: PostResource = {
	id: 1,
	type: "posts",
	attributes: {
		createdAt: "2023-01-01T00:00:00.000Z",
		replyType: "EVERYONE",
		text: "testText",
	},
	relationships: {
		user: {
			data: {
				id: "785cdd7a-8d0e-4e9c-9f3f-3195e3eb1c42",
				type: "users",
			},
			links: {
				self: "https://api.birdsite.dev/api/v1/users/785cdd7a-8d0e-4e9c-9f3f-3195e3eb1c42",
			},
		},
		parentPost: {
			data: { id: 10, type: "posts" },
			links: { self: "https://api.birdsite.dev/api/v1/posts/1" },
		},
	},
	metadata: {
		metrics: { likesCount: 1, repostsCount: 1, repliesCount: 1 },
		userInteractions: {
			isLiked: true,
			likedAt: "2023-01-01T00:00:00.000Z",
			isReposted: true,
			repostedAt: "2023-01-01T00:00:00.000Z",
		},
	},
	links: { self: "https://api.birdsite.dev/api/v1/posts/1" },
};

const postResource2: PostResource = {
	id: 2,
	type: "posts",
	attributes: {
		createdAt: "2023-01-01T00:00:00.000Z",
		replyType: "EVERYONE",
		text: "testText",
	},
	relationships: {
		user: {
			data: {
				id: "785cdd7a-8d0e-4e9c-9f3f-3195e3eb1c42",
				type: "users",
			},
			links: {
				self: "https://api.birdsite.dev/api/v1/users/785cdd7a-8d0e-4e9c-9f3f-3195e3eb1c42",
			},
		},
		parentPost: {
			data: { id: 10, type: "posts" },
			links: { self: "https://api.birdsite.dev/api/v1/posts/1" },
		},
	},
	metadata: {
		metrics: { likesCount: 1, repostsCount: 1, repliesCount: 1 },
		userInteractions: {
			isLiked: true,
			likedAt: "2023-01-01T00:00:00.000Z",
			isReposted: true,
			repostedAt: "2023-01-01T00:00:00.000Z",
		},
	},
	links: { self: "https://api.birdsite.dev/api/v1/posts/1" },
};
const apiPost: ApiResponse<PostResource> = {
	data: postResource1,
	links: {},
	metadata: {
		pagination: {
			numberOfElements: 1,
			totalElements: 1,
			last: true,
			first: true,
			empty: false,
		},
	},
	included: {
		users: [
			{
				id: "785cdd7a-8d0e-4e9c-9f3f-3195e3eb1c42",
				type: "users",
				attributes: {
					username: "test",
					handle: "test",
					profileImage: "test",
					createdAt: "2023-01-01T00:00:00.000Z",
				},
				links: {
					self: "https://api.birdsite.dev/api/v1/users/785cdd7a-8d0e-4e9c-9f3f-3195e3eb1c42",
				},
				metadata: {
					followCounts: { followers: 4, following: 2 },
					userInteractions: {
						isFollowing: true,
						followedAt: "2023-01-01T00:00:00.000Z",
						isFollowedBy: true,
						followedByAt: "2023-01-01T00:00:00.000Z",
					},
				},
			},
		],
	},
};
const apiPosts: ApiResponse<PostResource[]> = {
	data: [postResource1, postResource2],
	links: {},
	metadata: {
		pagination: {
			numberOfElements: 2,
			totalElements: 2,
			last: true,
			first: true,
			empty: false,
		},
	},
	included: {
		users: [
			{
				id: "785cdd7a-8d0e-4e9c-9f3f-3195e3eb1c42",
				type: "users",
				attributes: {
					username: "test",
					handle: "test",
					profileImage: "test",
					createdAt: "2023-01-01T00:00:00.000Z",
				},
				links: {
					self: "https://api.birdsite.dev/api/v1/users/785cdd7a-8d0e-4e9c-9f3f-3195e3eb1c42",
				},
				metadata: {
					followCounts: { followers: 3, following: 1 },
					userInteractions: {
						isFollowing: true,
						followedAt: "2023-01-01T00:00:00.000Z",
						isFollowedBy: true,
						followedByAt: "2023-01-01T00:00:00.000Z",
					},
				},
			},
		],
	},
};
