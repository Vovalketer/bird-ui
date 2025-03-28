import User from "@/lib/types/domain/user";
import { ApiResponse } from "@/lib/types/external/common";
import { UserResource } from "@/lib/types/external/userApi";
import toast from "react-hot-toast";
import useSWR from "swr";
import { userResponseMapper } from "../../mappers/userMapper";
import {
	followUserOptimisticData,
	unfollowUserOptimisticData,
} from "../../mutations/follow";
import { fetcher, followUser, unfollowUser } from "../birdApi";
import { useEffect, useState } from "react";

export function useUserDetails(username: string) {
	const [user, setUser] = useState<User | undefined>();
	const { data, mutate, ...rest } = useSWR<ApiResponse<UserResource>>(
		`/api/users/${username}`,
		fetcher,
	);
	const isFollowing = data?.data.metadata.userInteractions?.isFollowing;
	useEffect(() => {
		if (data) {
			setUser(userResponseMapper(data));
		}
	}, [data]);

	async function toggleFollow() {
		const isFollowing = data?.data.metadata.userInteractions?.isFollowing;
		if (data) {
			try {
				if (!isFollowing) {
					await mutate(followUserOptimisticData(data), false);
					await followUser(username);
				} else {
					await mutate(unfollowUserOptimisticData(data), false);
					await unfollowUser(username);
				}
			} catch (error) {
				await mutate(data);
				if (error instanceof Error) {
					toast.error(`${error.message}`);
				} else {
					toast.error("An error has occurred");
				}
			}
		} else {
			toast.error({ message: "User is not available" });
		}
	}

	return { user, toggleFollow, isFollowing, ...rest };
}
