import { Interactions } from "@/lib/types/domain/post";
import { ChatBubbleLeftIcon, HeartIcon } from "@heroicons/react/24/outline";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
interface PostInteractionProps {
	interactions: Interactions;
	onReply?: () => void;
	onLikeToggle?: () => void;
	onRepostToggle?: () => void;
}
export default function PostInteractions({
	interactions: { repliesCount, repostsCount, likesCount, isLiked, isReposted },
	onReply,
	onLikeToggle,
	onRepostToggle,
}: PostInteractionProps) {
	return (
		<>
			<div>
				<ReplyButton onClick={onReply} interactionsCount={repliesCount} />
			</div>
			<div>
				<LikeButton
					onClick={onLikeToggle}
					interactionsCount={likesCount}
					fill={isLiked}
				/>
			</div>
			<div>
				<RepostButton
					onClick={onRepostToggle}
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
	dataTestId?: string;
} & React.DetailedHTMLProps<
	React.ButtonHTMLAttributes<HTMLButtonElement>,
	HTMLButtonElement
>;
function BaseInteractionButton({
	interactionCount,
	dataTestId,
	children,
	...props
}: BaseInteractionButtonProps) {
	return (
		<button
			data-testid={dataTestId}
			className={`flex items-center gap-x-2 gap-y-10`}
			{...props}
		>
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
		<BaseInteractionButton
			dataTestId="replyButton"
			interactionCount={replyCount}
			onClick={onClick}
		>
			<ChatBubbleLeftIcon role="img" width={iconSize} height={iconSize} />
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
		<BaseInteractionButton
			dataTestId="likeButton"
			interactionCount={likeCount}
			onClick={onClick}
		>
			{fill ? (
				<HeartIcon
					role="img"
					width={iconSize}
					height={iconSize}
					color="red"
					fill="red"
				/>
			) : (
				<HeartIcon role="img" width={iconSize} height={iconSize} />
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
		<BaseInteractionButton
			dataTestId={"repostButton"}
			interactionCount={repostCount}
			onClick={onClick}
		>
			{fill ? (
				<ArrowPathIcon
					role="img"
					width={iconSize}
					height={iconSize}
					color="lime"
				/>
			) : (
				<ArrowPathIcon role="img" width={iconSize} height={iconSize} />
			)}
		</BaseInteractionButton>
	);
}
