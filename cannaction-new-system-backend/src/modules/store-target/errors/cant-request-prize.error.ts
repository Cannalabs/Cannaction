import { BaseHttpError } from '@/errors/base-http-error.dto';

export class CantRequestPrizeError extends BaseHttpError {
	constructor() {
		super(401, 'cant-request-prize', 'Target not Concluded!');
	}
}
