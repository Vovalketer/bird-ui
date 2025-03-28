import { ApiResponse } from "@/lib/types/external/common";
import { UserResource } from "@/lib/types/external/userApi";
import {
	followUserOptimisticData,
	unfollowUserOptimisticData,
} from "../follow";

let noUserInteractions: ApiResponse<UserResource>;
let notFollowingOrFollowed: ApiResponse<UserResource>;
let followingAndNotFollowed: ApiResponse<UserResource>;

beforeEach(() => {
	notFollowingOrFollowed = {
		data: {
			id: "2cb28a5a-7a39-4d1c-8b0f-bdc47ff5b5d8",
			type: "users",
			attributes: {
				username: "testUser",
				handle: "testHandle",
				profileImage: "testImage",
				location: "testLocation",
				bio: "testBio",
				createdAt: "2023-03-01T00:00:00.000Z",
				dateOfBirth: "1990-01-01T00:00:00.000Z",
			},
			metadata: {
				followCounts: {
					followers: 9,
					following: 5,
				},
				userInteractions: {
					isFollowing: false,
					followedAt: null,
					isFollowedBy: false,
					followedByAt: null,
				},
			},
			links: { self: "http://localhost:3000/api/users/testUser" },
		},
		links: {},
		metadata: {
			pagination: {
				empty: false,
				first: true,
				last: true,
				numberOfElements: 1,
				totalElements: 1,
			},
		},
	};
	followingAndNotFollowed = {
		data: {
			id: "2cb28a5a-7a39-4d1c-8b0f-bdc47ff5b5d8",
			type: "users",
			attributes: {
				username: "testUser",
				handle: "testHandle",
				profileImage: "testImage",
				location: "testLocation",
				bio: "testBio",
				createdAt: "2023-03-01T00:00:00.000Z",
				dateOfBirth: "1990-01-01T00:00:00.000Z",
			},
			metadata: {
				followCounts: {
					followers: 9,
					following: 5,
				},
				userInteractions: {
					isFollowing: true,
					followedAt: new Date(),
					isFollowedBy: false,
					followedByAt: null,
				},
			},

			links: { self: "http://localhost:3000/api/users/testUser" },
		},
		links: {},
		metadata: {
			pagination: {
				empty: false,
				first: true,
				last: true,
				numberOfElements: 1,
				totalElements: 1,
			},
		},
	};
	noUserInteractions = {
		data: {
			id: "2cb28a5a-7a39-4d1c-8b0f-bdc47ff5b5d8",
			type: "users",
			attributes: {
				username: "testUser",
				handle: "testHandle",
				profileImage: "testImage",
				location: "testLocation",
				bio: "testBio",
				createdAt: "2023-03-01T00:00:00.000Z",
				dateOfBirth: "1990-01-01T00:00:00.000Z",
			},
			metadata: {
				followCounts: {
					followers: 9,
					following: 5,
				},
				userInteractions: undefined,
			},

			links: { self: "http://localhost:3000/api/users/testUser" },
		},
		links: {},
		metadata: {
			pagination: {
				empty: false,
				first: true,
				last: true,
				numberOfElements: 1,
				totalElements: 1,
			},
		},
	};
});

describe("followUserOptimisticData", () => {
	it("should return the same response if userInteractions is not present", () => {
		const res = followUserOptimisticData(noUserInteractions);
		const userInteractions = res.data.metadata.userInteractions;
		expect(userInteractions).toBeUndefined();
	});
	it("should update the user interactions and follow the user", () => {
		const res = followUserOptimisticData(notFollowingOrFollowed);
		const userInteractions = res.data.metadata.userInteractions;
		expect(userInteractions).toBeDefined();
		expect(userInteractions?.isFollowing).toBe(true);
		expect(userInteractions?.followedAt).toBeDefined();
	});
});

describe("unfollowUserOptimisticData", () => {
	it("should return the same response if userInteractions is not present", () => {
		const res = unfollowUserOptimisticData(noUserInteractions);
		const userInteractions = res.data.metadata.userInteractions;
		expect(userInteractions).toBeUndefined();
	});
	it("should update the user interactions and unfollow the user", () => {
		const res = unfollowUserOptimisticData(followingAndNotFollowed);
		const userInteractions = res.data.metadata.userInteractions;
		expect(userInteractions).toBeDefined();
		expect(userInteractions?.isFollowing).toBe(false);
		expect(userInteractions?.followedAt).toBeNull();
	});
});
