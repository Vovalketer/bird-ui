import { ResponseLinks } from "./Links";
import { MediaResource } from "./MediaResource";
import { PostResource } from "./PostResource";
import { UserResource } from "./UserResource";

export interface ResourceResponse<T> {
	data: T;
	included?: IncludedResources;
	links: ResponseLinks;
	metadata: unknown;
}

interface IncludedResources {
	posts?: PostResource[];
	users?: UserResource[];
	media?: MediaResource[];
}
