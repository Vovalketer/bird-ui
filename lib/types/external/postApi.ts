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

interface PostResourceMetadata {
	metrics: PostMetrics;
	userInteractions?: UserInteractions;
}

export interface PostMetrics {
	repliesCount: number;
	repostsCount: number;
	likesCount: number;
}

export interface UserInteractions {
	isLiked: boolean;
	likedAt: string | Date | null;
	isReposted: boolean;
	repostedAt: string | Date | null;
}
