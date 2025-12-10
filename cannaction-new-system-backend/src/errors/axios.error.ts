export default class AxiosError extends Error {
	constructor(public status: number, message: string, public data: unknown) {
		super(message);
	}
}
