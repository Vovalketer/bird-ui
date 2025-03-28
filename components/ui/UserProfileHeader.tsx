import User from "@/lib/types/domain/user";
import UserAvatar from "./UserAvatar";
import { CakeIcon, MapPinIcon } from "@heroicons/react/24/outline";
import FollowButton from "./FollowButton";

interface UserProfileHeaderProps {
	user: User;
	onFollow?: () => void;
}
export default function UserProfileHeader({
	user,
	onFollow,
}: UserProfileHeaderProps) {
	return (
		<header className="relative flex flex-col gap-y-2">
			<UserAvatar profileImage={user.profileImage} size={24} />
			<div className="flex flex-col">
				<h2 className="text-xl font-bold">{user.username}</h2>
				<p className="text-sm opacity-60">@{user.handle}</p>
			</div>
			<p>{user.bio}</p>
			<div className="flex gap-x-6 opacity-60">
				{user.location && (
					<p className="flex text-sm gap-x-1">
						<MapPinIcon height={18} width={18} />
						{user.location}
					</p>
				)}
				{user.dateOfBirth && (
					<p className="flex text-sm gap-x-1">
						<CakeIcon height={18} width={18} />
						{user.dateOfBirth.toLocaleString()}
					</p>
				)}
			</div>
			<div className="flex gap-x-6 ">
				<p>
					<span className="font-bold ">{user.followingCount}</span>
					{" Following"}
				</p>
				<p>
					<span className="font-bold ">{user.followersCount}</span>
					{" Followers"}
				</p>
			</div>
			{user.isFollowing !== undefined ? (
				<div className="absolute top-2 right-2">
					<FollowButton isFollowing={user.isFollowing} onClick={onFollow} />
				</div>
			) : null}
		</header>
	);
}
