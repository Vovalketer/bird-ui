import Image from "next/image";
import Link from "next/link";
import ProfilePlaceholder from "@/public/profile-placeholder.png";

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
				<div className="size-12">
					<Image
						src={profileImage ? profileImage : ProfilePlaceholder}
						width={400}
						height={400}
						alt=""
					/>
				</div>
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
