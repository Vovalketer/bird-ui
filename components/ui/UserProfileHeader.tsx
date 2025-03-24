import User from "@/lib/types/domain/user";
import UserAvatar from "./UserAvatar";
import { CakeIcon, MapPinIcon } from "@heroicons/react/24/outline";

interface UserCardProps {
	user: User;
}
export default function UserProfileHeader({ user }: UserCardProps) {
	return (
		<header className="flex flex-col gap-y-2">
			<UserAvatar profileImage={user.profileImage} size={24} />
			<div className="flex flex-col">
				<h2 className="text-xl font-bold">{user.username}</h2>
				<p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
					@{user.handle}
				</p>
			</div>
			<p>{user.bio}</p>
			<div className="flex gap-x-6 text-light-text-secondary dark:text-dark-text-secondary">
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
			<div className="flex gap-x-6 text-light-text-secondary dark:text-dark-text-secondary">
				<p>
					<span className="font-bold text-light-text-primary dark:text-dark-text-primary">
						{user.following}
					</span>
					{" Following"}
				</p>
				<p>
					<span className="font-bold text-light-text-primary dark:text-dark-text-primary">
						{user.followers}
					</span>
					{" Followers"}
				</p>
			</div>
		</header>
	);
}
