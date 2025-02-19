"use client";

import PostCard from "@/components/ui/PostCard";
import { fetcher } from "@/lib/fetcher";
import { PostResource } from "@/lib/types/PostResource";
import { ResourceResponse } from "@/lib/types/ResourceResponse";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR from "swr";

export default function Post() {
	const { id } = useParams();
	const { data } = useSWR(
		`/api/posts/${id}`,
		fetcher<ResourceResponse<PostResource>>,
	);
	const [resource, setResource] = useState<
		ResourceResponse<PostResource> | undefined
	>(undefined);

	useEffect(() => {
		if (data) {
			setResource(data);
		}
	}, [data]);

	const included = data?.included;
	const user = included?.users?.find(
		(user) => user.id === resource?.data.relationships.user.data.id,
	);

	return (
		<main className="flex flex-col my-5 mx-20">
			<PostCard key={resource?.data.id} post={resource?.data} user={user} />
		</main>
	);
}
