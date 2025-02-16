// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from "next-auth/next";

declare module "next-auth" {
	interface User {
		id: string;
		username: string;
		handle: string;
		image?: string;
		accessToken?: string;
	}

	interface Session {
		user: {
			id: string;
			username: string;
			handle: string;
			profileImage?: string;
		};
		accessToken?: string;
	}
}
declare module "next-auth/jwt" {
	interface JWT {
		username: string;
		handle: string;
		picture?: string;
		accessToken?: string;
	}
}
