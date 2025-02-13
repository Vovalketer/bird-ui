import { ResourceLinks } from "./Links";
import { ResourceIdentifier } from "./ResourceIdentifier";
import { RelationshipToOne } from "./ResourceRelationships";

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
