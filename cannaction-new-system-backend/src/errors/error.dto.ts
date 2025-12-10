export class ErrorDto {
	readonly status: number;

	readonly code: string;

	readonly message: string;

	readonly data: unknown;

	constructor(options: Partial<ErrorDto> = {}) {
		options.status && (this.status = options.status);
		options.code && (this.code = options.code);
		options.message && (this.message = options.message);
		options.data && (this.data = options.data);
	}
}
