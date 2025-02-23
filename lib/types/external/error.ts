export interface ErrorResponse {
	errors: ErrorApi[];
}
export interface ErrorApi {
	status: string;
	title: string;
	detail: string;
	source: ErrorSource;
}

interface ErrorSource {
	pointer: string;
	parameter: string;
	header: string;
}
