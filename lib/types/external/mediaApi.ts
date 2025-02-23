import { RelationshipToOne, ResourceIdentifier, ResourceLinks } from "./common";

export interface MediaResource extends ResourceIdentifier<number> {
	attributes: MediaAttributes;
	relationships: MediaRelationships;
	links: ResourceLinks;
}

export interface MediaAttributes {
	url: string;
	description?: string;
	width: number;
	height: number;
	fileSize: number;
	duration?: number;
	format: string;
}

interface MediaRelationships {
	post: RelationshipToOne<number>;
}
