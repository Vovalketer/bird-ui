"use server";
import axios from "axios";
export const axiosBaseClient = axios.create({
	baseURL: "http://localhost:8080",
});

export const axiosClient = axios.create({
	baseURL: "http://localhost:8080",
	headers: { "Content-Type": "application/json" },
});
