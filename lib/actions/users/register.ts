"use server";
import { axiosInstance } from "@/lib/fetcher";
import { ErrorResponse } from "@/lib/types/ErrorResponse";
import {
	RegistrationError,
	RegistrationSchema,
} from "@/lib/types/Registration";
import { UserResource } from "@/lib/types/UserResource";
import { AxiosError, isAxiosError } from "axios";

export default async function register(signUp: unknown) {
	const result = RegistrationSchema.safeParse(signUp);
	const errors: RegistrationError[] = [];

	if (!result.success) {
		result.error.issues.forEach((issue) => {
			errors.push({ id: issue.path[0], message: issue.message });
		});
		return { success: false, errors };
	}

	try {
		const serverResponse = await axiosInstance.post<UserResource>(
			"/api/users/register",
			result.data,
		);
		console.log(serverResponse.data);
		return { success: true };
	} catch (error) {
		if (isAxiosError(error)) {
			const err: AxiosError<ErrorResponse[]> = error;
			err.response?.data.forEach((error) => {
				errors.push({ id: error.title, message: error.detail });
			});
		} else {
			errors.push({
				id: "Unknown error",
				message: "An unknown error occurred",
			});
		}
		return { success: false, errors };
	}
}
