import {
	RelationshipToMany,
	RelationshipToOne,
	ResourceIdentifier,
	ResourceLinks,
} from "./common";

export interface PostResource extends ResourceIdentifier<number> {
	attributes: PostAttributes;
	relationships: PostRelationships;
	metadata: PostResourceMetadata;
	links: ResourceLinks;
}

interface PostAttributes {
	text: string;
	replyType: "EVERYONE" | "FOLLOWERS" | "MENTIONS";
	createdAt: string | Date;
}

interface PostRelationships {
	user: RelationshipToOne<string>;
	parent?: RelationshipToOne<number>;
	media?: RelationshipToMany<number>;
}

export interface PostResourceMetadata {
	interactions: Interactions;
}

export interface Interactions {
	repliesCount: number;
	likesCount: number;
	repostsCount: number;
	isLiked: boolean;
	isReposted: boolean;
}
