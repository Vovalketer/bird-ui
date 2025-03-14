import { ErrorDetails } from "./error";

export interface HttpResponse<T> {
	success: boolean;
	response?: T;
	errors?: ErrorDetails[] | null;
}
