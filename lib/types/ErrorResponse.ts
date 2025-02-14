export interface ErrorResponse {
	errors: ErrorResource[];
}
export interface ErrorResource {
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
