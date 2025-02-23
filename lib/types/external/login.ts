import { z } from "zod";

export const LoginSchema = z.object({
	email: z.string().email(),
	password: z
		.string()
		.min(6, { message: "Password must be at least 6 characters long" })
		.max(20, { message: "Password must be at most 20 characters long" }),
});

export interface LoginErrors {
	id: string | number;
	message: string;
}

export interface LoginResponse {
	accessToken: string;
}
