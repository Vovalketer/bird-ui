import { ResourceIdentifier } from "./ResourceIdentifier";
import { ResourceLinks } from "./Links";

export interface RelationshipToOne<T extends number | string> {
	data: ResourceIdentifier<T>;
	links: ResourceLinks;
}
export interface RelationshipToMany<T extends number | string> {
	data: ResourceIdentifier<T>[];
	links: ResourceLinks;
}
