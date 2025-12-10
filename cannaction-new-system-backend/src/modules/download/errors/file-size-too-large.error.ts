import { BaseHttpError } from '@/errors/base-http-error.dto';

export class FileSizeTooLargeError extends BaseHttpError {
	constructor() {
		super(404, 'file-size-too-large', `File Size too large.`);
	}
}
