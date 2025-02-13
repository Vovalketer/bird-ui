import { ResourceLinks } from "./Links";
import { ResourceIdentifier } from "./ResourceIdentifier";

export interface UserResource extends ResourceIdentifier<string> {
	attributes: UserAttributes;
	links: ResourceLinks;
}

export interface UserAttributes {
	username: string;
	handle: string;
	bio?: string;
	dateOfBirth?: Date;
	location?: string;
	profileImage?: string;
	createdAt: Date;
}
