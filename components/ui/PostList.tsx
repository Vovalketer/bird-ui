import PostCard from "./PostCard";
import Post from "@/lib/types/domain/post";

interface PostListProps {
	posts?: Post[];
}

export default function PostList({ posts, users, media }: PostListProps) {
	if (!posts || !users) return null;
	return (
		<article className="flex flex-col">
			{posts.map((p) => (
				<PostCard
					key={p.id}
					post={p}
					media={media?.filter((m) => m.relationships.post.data.id === p.id)}
					user={users.find((u) => u.id === p.relationships.user.data.id)}
				/>
			))}
		</article>
	);
}
