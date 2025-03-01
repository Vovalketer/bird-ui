import { MediaResource } from "./mediaApi";
import { PostResource } from "./postApi";
import { UserResource } from "./userApi";

export interface ApiResponse<T> {
	data: T;
	included?: IncludedResources;
	links: ResponseLinks;
	metadata: ResponseMetadata;
}

interface IncludedResources {
	posts?: PostResource[];
	users?: UserResource[];
	media?: MediaResource[];
}
interface ResponseMetadata {
	pagination: Pagination;
}
interface Pagination {
	totalElements: number;
	numberOfElements: number;
	first: boolean;
	last: boolean;
	empty: boolean;
}
export interface ResourceLinks {
	self: string;
	related?: string;
}
export interface ResponseLinks {
	self?: string;
	first?: string;
	last?: string;
	next?: string;
	prev?: string;
}
export interface ResourceIdentifier<T extends number | string> {
	id: T;
	type: string;
}
export interface RelationshipToOne<T extends number | string> {
	data: ResourceIdentifier<T>;
	links: ResourceLinks;
}
export interface RelationshipToMany<T extends number | string> {
	data: ResourceIdentifier<T>[];
	links: ResourceLinks;
}
