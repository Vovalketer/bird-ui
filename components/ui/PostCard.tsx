import PostInteractions from "./PostInteractions";
import UserHeader from "./UserHeader";
import PostContent from "./PostContent";
import { MediaResource } from "@/lib/types/MediaResource";
import { PostResource } from "@/lib/types/PostResource";
import { UserResource } from "@/lib/types/UserResource";

interface PostCardProps {
	post?: PostResource;
	media?: MediaResource[];
	user?: UserResource;
}

export default function PostCard({ post, media, user }: PostCardProps) {
	if (!post || !user) return null;
	return (
		<article className="border-2 border-light-border dark:border-dark-border">
			<header className="p-2">
				<UserHeader
					username={user.attributes.username}
					handle={user.attributes.handle}
					profileImage={user.attributes.profileImage}
					url={user.links.self}
				/>
			</header>
			<section className="flex flex-col gap-y-4 px-16">
				<PostContent
					text={post.attributes.text}
					media={media}
					createdAt={post.attributes.createdAt}
				/>
			</section>
			<footer className="flex justify-between place-items-center w-full py-3 px-24">
				<PostInteractions interactions={post.metadata.interactions} />
			</footer>
		</article>
	);
}
