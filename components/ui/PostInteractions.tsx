import { Interactions } from "@/lib/types/PostResourceMetadata";
import { ChatBubbleLeftIcon, HeartIcon } from "@heroicons/react/24/outline";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
interface PostInteractionProps {
	interactions: Interactions;
	handleReply?: () => void;
	handleLike?: () => void;
	handleRepost?: () => void;
}
export default function PostInteractions({
	interactions: { repliesCount, repostsCount, likesCount, isLiked, isReposted },
	handleReply,
	handleLike,
	handleRepost,
}: PostInteractionProps) {
	return (
		<>
			<div>
				<ReplyButton onClick={handleReply} interactionsCount={repliesCount} />
			</div>
			<div>
				<LikeButton
					onClick={handleLike}
					interactionsCount={likesCount}
					fill={isLiked}
				/>
			</div>
			<div>
				<RepostButton
					onClick={handleRepost}
					interactionsCount={repostsCount}
					fill={isReposted}
				/>
			</div>
		</>
	);
}
type BaseInteractionButtonProps = {
	children: React.ReactNode;
	className?: string;
	iconSize?: number;
	interactionCount: number;
} & React.DetailedHTMLProps<
	React.ButtonHTMLAttributes<HTMLButtonElement>,
	HTMLButtonElement
>;
function BaseInteractionButton({
	interactionCount,
	children,
	...props
}: BaseInteractionButtonProps) {
	return (
		<button className={`flex items-center gap-x-2 gap-y-10`} {...props}>
			{children} <p>{interactionCount}</p>
		</button>
	);
}

interface InteractionButtonProps {
	interactionsCount: number;
	onClick?: () => void;
	fill?: boolean;
	iconSize?: number;
	className?: string;
}

function ReplyButton({
	interactionsCount: replyCount,
	onClick,
	iconSize = 24,
}: InteractionButtonProps) {
	return (
		<BaseInteractionButton interactionCount={replyCount} onClick={onClick}>
			<ChatBubbleLeftIcon width={iconSize} height={iconSize} />
		</BaseInteractionButton>
	);
}

function LikeButton({
	interactionsCount: likeCount,
	onClick,
	fill,
	iconSize = 24,
}: InteractionButtonProps) {
	return (
		<BaseInteractionButton interactionCount={likeCount} onClick={onClick}>
			{fill ? (
				<HeartIcon width={iconSize} height={iconSize} color="red" fill="red" />
			) : (
				<HeartIcon width={iconSize} height={iconSize} />
			)}
		</BaseInteractionButton>
	);
}

function RepostButton({
	interactionsCount: repostCount,
	onClick,
	fill,
	iconSize = 24,
}: InteractionButtonProps) {
	return (
		<BaseInteractionButton interactionCount={repostCount} onClick={onClick}>
			{fill ? (
				<ArrowPathIcon width={iconSize} height={iconSize} color="lime" />
			) : (
				<ArrowPathIcon width={iconSize} height={iconSize} />
			)}
		</BaseInteractionButton>
	);
}
