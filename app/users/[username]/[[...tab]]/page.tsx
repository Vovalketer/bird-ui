"use client";
import InfiniteList from "@/components/InfiniteList";
import NewPostButton from "@/components/ui/NewPostButton";
import PostCard from "@/components/ui/PostCard";
import Tab from "@/components/ui/Tab";
import TabsContainer from "@/components/ui/TabsContainer";
import UserProfileHeader from "@/components/ui/UserProfileHeader";
import { useNewPostModal } from "@/context/NewPostModalContext";
import { useUserDetails } from "@/lib/services/api/hooks/useUserDetails";
import { useUserInfinitePosts } from "@/lib/services/api/hooks/useUserInfinitePosts";
import { useParams } from "next/navigation";

export default function UserPage() {
	// user bgaynor5h has 10 posts
	const { username, tab } = useParams();
	const currentTab = Array.isArray(tab) ? tab[0] : tab || "posts";
	if (Array.isArray(tab) && tab.length > 1) {
		//temporary measure
		throw new Error("Invalid url");
	}
	const { posts, likeToggle, repostToggle, loadMore, hasMore, isLoading } =
		useUserInfinitePosts(username as string, currentTab);
	const { user } = useUserDetails(username as string);
	const { openModal } = useNewPostModal();

	if (!user) return <div>Loading...</div>;

	return (
		<>
			<UserProfileHeader user={user} />
			<TabsContainer>
				<Tab href={`/users/${username}`}>Posts</Tab>
				<Tab href={`/users/${username}/replies`}>Replies</Tab>
				<Tab href={`/users/${username}/media`}>Media</Tab>
				<Tab href={`/users/${username}/likes`}>Likes</Tab>
			</TabsContainer>
			<InfiniteList
				onLoadMore={loadMore}
				isLoading={isLoading}
				hasMore={hasMore}
			>
				{posts?.map((post) => (
					<PostCard
						key={post.id}
						post={post}
						onLike={() => likeToggle(post.id)}
						onRepost={() => repostToggle(post.id)}
						onReply={() => openModal(post)}
					/>
				))}
			</InfiniteList>
			<NewPostButton />
		</>
	);
}
