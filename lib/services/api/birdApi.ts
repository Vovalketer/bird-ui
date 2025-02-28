"use client";
import axios from "axios";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";

export const axiosClient = axios.create({
	baseURL: "http://localhost:8080",
	headers: { "Content-Type": "application/json" },
});
let lastSession: Session | null = null;
axiosClient.interceptors.request.use(
	async (request) => {
		if (lastSession == null || Date.now() > Date.parse(lastSession.expires)) {
			const session = await getSession();
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

export const fetcher = async <T>(url: string) => {
	const res = await axiosClient.get<T>(url);
	return res.data;
};
