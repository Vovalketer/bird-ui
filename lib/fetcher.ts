import axios from "axios";

export const axiosInstance = axios.create({
	baseURL: "http://localhost:8080",
});

export const fetcher = async <T>(url: string) => {
	const res = await axiosInstance.get<T>(url);
	return res.data;
};
