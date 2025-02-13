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
