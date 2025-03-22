import Image from "next/image";
import ProfilePlaceholder from "@/public/profile-placeholder.png";

interface UserAvatarProps {
	profileImage?: string;
	size?: number;
}
export default function UserAvatar({
	profileImage,
	size = 12,
}: UserAvatarProps) {
	//use inline style to set the size of the image because tailwind doesn't support dynamic styles
	return (
		<div style={{ position: "relative", width: size * 4, height: size * 4 }}>
			<Image
				className={`avatar rounded-full`}
				src={profileImage ? profileImage : ProfilePlaceholder}
				fill={true}
				alt="profile image"
			/>
		</div>
	);
}
