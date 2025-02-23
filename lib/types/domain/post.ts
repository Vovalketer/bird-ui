import Media from "./media";
import User from "./user";

export default interface Post {
	id: number;
	text?: string;
	replyType: "EVERYONE" | "FOLLOWERS" | "MENTIONS";
	createdAt: string | Date;
	user: User;
	media?: Media[];
	interactions: Interactions;
}

interface Interactions {
	likesCount: number;
	repostsCount: number;
	repliesCount: number;
	isLiked: boolean;
	isReposted: boolean;
}
