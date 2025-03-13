import { PostResource } from "@/lib/types/external/postApi";
import PostList from "../components/ui/PostList";
import { UserResource } from "@/lib/types/external/userApi";

const user1: UserResource = {
	id: "cbf9f660-570d-4049-8d71-c0efab274f4e",
	type: "users",
	attributes: {
		username: "testusername",
		handle: "testhandle",
		bio: "testbio",
		dateOfBirth: new Date(),
		location: "testlocation",
		profileImage: "https://www.pngall.com/wp-content/uploads/5/Profile.png",
		createdAt: new Date(),
	},
	links: {
		self: "http://localhost:8080/users/1",
	},
};

const user2: UserResource = {
	id: "de3a8ccf-8b65-4e1a-841e-a4448bba0c4f",
	type: "users",
	attributes: {
		username: "testusername2",
		handle: "testhandle2",
		bio: "testbio",
		dateOfBirth: new Date(),
		location: "testlocation",
		profileImage: "https://www.pngall.com/wp-content/uploads/5/Profile.png",
		createdAt: new Date(),
	},
	links: {
		self: "http://localhost:8080/users/1",
	},
};
const post1: PostResource = {
	id: 2,
	type: "posts",
	attributes: {
		text: "testtext",
		replyType: "EVERYONE",
		createdAt: new Date(),
	},
	relationships: {
		user: {
			data: { id: "cbf9f660-570d-4049-8d71-c0efab274f4e", type: "users" },
			links: { self: "http://localhost:8080/users/testusername" },
		},
		parent: {
			data: { id: 1, type: "posts" },
			links: { self: "http://localhost:8080/posts/1" },
		},
		media: {
			data: [{ id: 1, type: "media" }],
			links: { self: "http://localhost:8080/media/1" },
		},
	},
	metadata: {
		interactions: {
			repliesCount: 0,
			repostsCount: 0,
			likesCount: 0,
			isLiked: false,
			isReposted: false,
		},
	},
	links: {
		self: "http://localhost:8080/posts/2",
		related: "http://localhost:8080/posts/1/replies",
	},
};
const post2: PostResource = {
	id: 3,
	type: "posts",
	attributes: {
		text: "testtext2",
		replyType: "EVERYONE",
		createdAt: new Date(),
	},
	relationships: {
		user: {
			data: { id: "cbf9f660-570d-4049-8d71-c0efab274f4e", type: "users" },
			links: { self: "http://localhost:8080/users/testusername" },
		},
		parent: {
			data: { id: 1, type: "posts" },
			links: { self: "http://localhost:8080/posts/1" },
		},
		media: {
			data: [{ id: 1, type: "media" }],
			links: { self: "http://localhost:8080/media/1" },
		},
	},
	metadata: {
		interactions: {
			repliesCount: 0,
			repostsCount: 0,
			likesCount: 0,
			isLiked: false,
			isReposted: false,
		},
	},
	links: {
		self: "http://localhost:8080/posts/3",
		related: "http://localhost:8080/posts/1/replies",
	},
};
const post3: PostResource = {
	id: 4,
	type: "posts",
	attributes: {
		text: "testtext3",
		replyType: "EVERYONE",
		createdAt: new Date(),
	},
	relationships: {
		user: {
			data: { id: "de3a8ccf-8b65-4e1a-841e-a4448bba0c4f", type: "users" },
			links: { self: "http://localhost:8080/users/testusername" },
		},
		media: {
			data: [{ id: 1, type: "media" }],
			links: { self: "http://localhost:8080/media/1" },
		},
	},
	metadata: {
		interactions: {
			repliesCount: 0,
			repostsCount: 0,
			likesCount: 0,
			isLiked: false,
			isReposted: false,
		},
	},
	links: {
		self: "http://localhost:8080/posts/4",
	},
};

export default function Home() {
	const posts = [post1, post2, post3];
	const users = [user1, user2];
	return (
		<>
			<p>hi</p>
		</>
	);
}
