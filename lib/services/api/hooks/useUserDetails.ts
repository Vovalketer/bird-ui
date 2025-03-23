import useSWR from "swr";
import { fetcher } from "../birdApi";
import { ApiResponse } from "@/lib/types/external/common";
import { UserResource } from "@/lib/types/external/userApi";
import { userResponseMapper } from "../../mappers/userMapper";
import User from "@/lib/types/domain/user";

export function useUserDetails(username: string) {
	const { data, ...rest } = useSWR<ApiResponse<UserResource>>(
		`/api/users/${username}`,
		fetcher,
	);
	let user: User | undefined;
	if (data) {
		user = userResponseMapper(data);
	}

	return { user, ...rest };
}
