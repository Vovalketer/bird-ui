export interface ErrorResponse {
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
