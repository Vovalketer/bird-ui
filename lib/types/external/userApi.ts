import { ResourceIdentifier, ResourceLinks } from "./common";

export interface UserResource extends ResourceIdentifier<string> {
	attributes: UserAttributes;
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
