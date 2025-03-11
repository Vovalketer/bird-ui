import { ErrorDetail } from "./error";

export interface HttpResponse<T> {
	success: boolean;
	response?: T;
	errors?: ErrorDetail[] | null;
}
