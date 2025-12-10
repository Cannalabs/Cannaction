class AxiosError extends Error {
	constructor(readonly status: number, message: string, readonly data: unknown) {
		super(message);
	}
}

export class ECONNREFUSEDError extends AxiosError {
	readonly code = 'ECONNREFUSED';

	constructor() {
		super(
			500,
			"Sorry, we've encountered a connection problem. The server may be temporarily unavailable. Please try again later.",
			undefined
		);
	}
}

export class ERR_NETWORKError extends AxiosError {
	readonly code = 'ECONNREFUSED';

	constructor() {
		super(
			500,
			'Sorry, we were unable to establish a connection with the server. Please check your network connection and try again.',
			undefined
		);
	}
}

export class CannError extends AxiosError {
	constructor(
		status: number,
		readonly code: string,
		message: string,
		data: unknown
	) {
		super(status, message, data);
	}
}
