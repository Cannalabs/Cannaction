import { BaseHttpError } from '@/errors/base-http-error.dto';

export class CantDeleteUserError extends BaseHttpError {
	constructor() {
		super(400, 'cant-delete-user', `User has registers in other tables and can't be deleted.`);
	}
}
