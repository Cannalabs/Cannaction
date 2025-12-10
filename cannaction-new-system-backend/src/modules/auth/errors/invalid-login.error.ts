import { BaseHttpError } from '@/errors/base-http-error.dto';

export class InvalidLoginError extends BaseHttpError {
	constructor() {
		super(400, 'invalid-login', `Invalid User or Password.`);
	}
}
