import { axiosClient } from "@/lib/services/api/birdApi";
import { ApiResponse } from "@/lib/types/external/common";
import { ErrorResponse } from "@/lib/types/external/error";
import { LoginResponse, LoginSchema } from "@/lib/types/external/login";
import { UserResource } from "@/lib/types/external/userApi";
import { AxiosError, isAxiosError } from "axios";
import { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const options: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				email: {
					label: "Email",
					type: "text",
					placeholder: "example@email.com",
				},
				password: {
					label: "Password",
					type: "password",
					placeholder: "password",
				},
			},
			async authorize(credentials) {
				const parsedCredentials = LoginSchema.safeParse(credentials);
				if (!parsedCredentials.success) {
					throw new Error("Invalid credentials format");
				}
				const res = await axiosClient
					.post<LoginResponse>("/api/auth/login", parsedCredentials.data)
					.catch(catchError);

				if (!res || res.status !== 200 || !res.data) {
					return null;
				}
				const userRes = await axiosClient
					.get<ApiResponse<UserResource>>("/api/users", {
						headers: { Authorization: `Bearer ${res.data.accessToken}` },
					})
					.catch(catchError);

				if (!userRes || userRes.status !== 200 || !userRes.data) {
					return null;
				}
				const userData = userRes.data;
				const user: User = {
					id: userData.data.id,
					username: userData.data.attributes.username,
					handle: userData.data.attributes.handle,
					image: userData.data.attributes.profileImage,
					accessToken: res.data.accessToken,
				};
				return user;
			},
		}),
	],
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.username = user.username;
				token.image = user.image;
				token.handle = user.handle;
				token.accessToken = user.accessToken;
			}
			return token;
		},

		async session({ session, token }) {
			if (token) {
				session.user.handle = token.handle;
				session.user.profileImage = token?.picture || "";
				session.user.username = token.username;
				session.accessToken = token.accessToken;
			}
			return session;
		},
	},
};

function catchError(error: Error) {
	if (isAxiosError(error)) {
		let msg = "";
		const err: AxiosError<ErrorResponse> = error;
		err.response?.data.errors.forEach((error) => {
			msg += `${error.title}: ${error.detail}\n`;
		});
		throw Error(msg);
	} else {
		throw Error(error.message);
	}
}
