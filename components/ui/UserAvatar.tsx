import Image from "next/image";
import ProfilePlaceholder from "@/public/profile-placeholder.png";

interface UserAvatarProps {
	profileImage?: string;
}
export default function UserAvatar({ profileImage }: UserAvatarProps) {
	return (
		<Image
			className="avatar size-12 rounded-full"
			src={profileImage ? profileImage : ProfilePlaceholder}
			width={100}
			height={100}
			alt="profile image"
		/>
	);
}
