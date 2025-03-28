import Button from "./Button";
interface FollowButtonProps {
	isFollowing: boolean;
	onClick?: () => void;
}
export default function FollowButton({
	isFollowing,
	onClick,
}: FollowButtonProps) {
	return (
		<Button color="secondary" onClick={onClick}>
			{isFollowing ? "Unfollow" : "Follow"}
		</Button>
	);
}
