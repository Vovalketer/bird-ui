import axios from "axios";

export const axiosClient = axios.create({
	baseURL: "http://localhost:8080",
});

export const fetcher = async <T>(url: string) => {
	const res = await axiosClient.get<T>(url);
	return res.data;
};
