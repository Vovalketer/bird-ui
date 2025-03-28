import { ResourceIdentifier, ResourceLinks } from "./common";

export interface UserResource extends ResourceIdentifier<string> {
	attributes: UserAttributes;
	metadata: UserMetadata;
	links: ResourceLinks;
}

export interface UserAttributes {
	username: string;
	handle: string;
	bio?: string;
	dateOfBirth?: string | Date;
	location?: string;
	profileImage?: string;
	createdAt: string | Date;
}

export interface UserMetadata {
	followCounts?: {
		followers: number;
		following: number;
	};
	userInteractions?: {
		isFollowing: boolean;
		followedAt: string | Date | null;
		isFollowedBy: boolean;
		followedByAt: string | Date | null;
	};
}
