"use server";
import { options } from "@/app/api/auth/[...nextauth]/options";
import axios from "axios";
import { getServerSession, Session } from "next-auth";

export const axiosBaseClient = axios.create({
	baseURL: "http://localhost:8080",
});

export const axiosClient = axios.create({
	baseURL: "http://localhost:8080",
	headers: { "Content-Type": "application/json" },
});

let lastSession: Session | null = null;
axiosClient.interceptors.request.use(
	async (request) => {
		if (!lastSession || Date.now() > Date.parse(lastSession.expires)) {
			const session = await getServerSession(options);
			lastSession = session;
		}
		if (lastSession) {
			request.headers.Authorization = `Bearer ${lastSession.accessToken}`;
		} else {
			request.headers.Authorization = undefined;
		}
		return request;
	},
	(error) => {
		return Promise.reject(error);
	},
);
