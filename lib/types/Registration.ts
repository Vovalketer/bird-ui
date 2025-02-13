import { z } from "zod";

export const RegistrationSchema = z.object({
	username: z
		.string()
		.min(3, { message: "Username must be at least 3 characters" })
		.max(20, { message: "Username must be at most 20 characters" }),
	handle: z
		.string()
		.min(3, { message: "Handle must be at least 3 characters" })
		.max(20, { message: "Handle must be at most 20 characters" }),
	email: z.string().email(),
	password: z
		.string()
		.min(6, { message: "Password must be at least 6 characters" })
		.max(20, { message: "Password must be at most 20 characters" }),
});

export interface RegistrationError {
	id: string | number;
	message: string;
}
