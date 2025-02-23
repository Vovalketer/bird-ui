import User from "@/lib/types/domain/user";
import { ApiResponse } from "@/lib/types/external/common";
import { UserResource } from "@/lib/types/external/userApi";

export function userResponseMapper(response: ApiResponse<UserResource>): User {
	//might handle other included  stuff through this function later
	return userMapper(response.data);
}

export function userMapper(user: UserResource): User {
	return {
		id: user.id,
		username: user.attributes.username,
		handle: user.attributes.handle,
		bio: user.attributes.bio,
		dateOfBirth: user.attributes.dateOfBirth,
		location: user.attributes.location,
		profileImage: user.attributes.profileImage,
		createdAt: user.attributes.createdAt,
	};
}
