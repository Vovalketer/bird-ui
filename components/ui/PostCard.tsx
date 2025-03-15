import PostInteractions from "./PostInteractions";
import UserHeader from "./UserHeader";
import PostContent from "./PostContent";
import Post from "@/lib/types/domain/post";

interface PostCardProps {
	post: Post;
	onLike?: () => void;
	onRepost?: () => void;
	onReply?: () => void;
}

export default function PostCard({
	post,
	onLike,
	onRepost,
	onReply,
}: PostCardProps) {
	return (
		<article className="border-2 border-light-border dark:border-dark-border">
			<header className="p-2">
				<UserHeader
					username={post.user.username}
					handle={post.user.handle}
					profileImage={post.user.profileImage}
					url={`http://localhost:3000/users/${post.user.username}`}
				/>
			</header>
			<section className="flex flex-col gap-y-4 px-16">
				<PostContent
					text={post.text}
					media={post.media}
					createdAt={post.createdAt}
					url={`http://localhost:3000/posts/${post.id}`}
				/>
			</section>
			<footer className="flex justify-between place-items-center w-full py-3 px-24">
				<PostInteractions
					interactions={post.interactions}
					onLikeToggle={onLike}
					onRepostToggle={onRepost}
					onReply={onReply}
				/>
			</footer>
		</article>
	);
}
