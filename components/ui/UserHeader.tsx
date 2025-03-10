import Link from "next/link";
import UserAvatar from "./UserAvatar";

interface UserHeaderProps {
	username: string;
	handle: string;
	profileImage?: string;
	url: string;
}
export default function UserHeader({
	username,
	handle,
	profileImage,
	url,
}: UserHeaderProps) {
	return (
		<>
			<Link href={url} className="flex">
				<UserAvatar profileImage={profileImage} />
				<div className="flex flex-col place-content-center pl-2 text-sm">
					<p className="font-semibold">{handle}</p>
					<p className="text-light-text-secondary dark:text-dark-text-secondary">
						@{username}
					</p>
				</div>
			</Link>
		</>
	);
}
