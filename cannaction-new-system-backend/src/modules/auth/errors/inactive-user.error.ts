import { BaseHttpError } from '@/errors/base-http-error.dto';

export class InactiveUserError extends BaseHttpError {
	constructor() {
		super(400, 'inactive-user', `User is not active.`);
	}
}
