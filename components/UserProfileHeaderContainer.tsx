import { useUserDetails } from "@/lib/services/api/hooks/useUserDetails";
import UserProfileHeader from "./ui/UserProfileHeader";

interface UserProfileHeaderContainerProps {
	username: string;
}
export default function UserProfileHeaderContainer({
	username,
}: UserProfileHeaderContainerProps) {
	const { user, toggleFollow } = useUserDetails(username);
	//TODO: display placeholder if the user is not available
	return user ? (
		<UserProfileHeader user={user} onFollow={toggleFollow} />
	) : null;
}
