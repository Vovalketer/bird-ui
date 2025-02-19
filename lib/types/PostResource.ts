import { ResourceLinks } from "./Links";
import { PostResourceMetadata } from "./PostResourceMetadata";
import { ResourceIdentifier } from "./ResourceIdentifier";
import { RelationshipToMany, RelationshipToOne } from "./ResourceRelationships";

export interface PostResource extends ResourceIdentifier<number> {
	attributes: PostAttributes;
	relationships: PostRelationships;
	metadata: PostResourceMetadata;
	links: ResourceLinks;
}

interface PostAttributes {
	text: string;
	replyType: "EVERYONE" | "FOLLOWERS" | "MENTIONS";
	createdAt: string;
}

interface PostRelationships {
	user: RelationshipToOne<string>;
	parent?: RelationshipToOne<number>;
	media?: RelationshipToMany<number>;
}
