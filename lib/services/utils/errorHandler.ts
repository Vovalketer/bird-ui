import { ErrorDetails } from "@/lib/types/domain/error";
import { ErrorResponse } from "@/lib/types/external/error";
import { AxiosError, isAxiosError } from "axios";

export default function errorHandler(
	error: unknown,
	unknownErrorMessage?: string,
) {
	if (isAxiosError(error)) {
		const err: AxiosError<ErrorResponse> = error;
		if (err.response) {
			const errResponse: ErrorDetails[] = err.response?.data.errors.map(
				(error) => {
					return {
						cause: error.source ? error.source.parameter : error.title,
						message: error.detail,
					};
				},
			);

			return {
				success: false,
				errors: errResponse,
			};
		}
	}
	if (unknownErrorMessage) {
		throw new Error(unknownErrorMessage);
	} else {
		throw new Error("An unexpected error has occurred");
	}
}
