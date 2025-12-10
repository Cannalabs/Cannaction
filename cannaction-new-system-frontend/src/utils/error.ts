import { ECONNREFUSEDError, ERR_NETWORKError, CannError } from '../errors';

type ErrorDetails = {
	message: string;
	title?: string | false;
	status?: number;
	data?: unknown;
};

export const getErrorDetails = (
	message: string | unknown
): [ErrorDetails, string] => {
	if (typeof message === 'string') {
		return [
			{
				message,
			},
			'',
		];
	}
	if (message instanceof ERR_NETWORKError) {
		return [
			{
				status: message.status,
				message: message.message,
				data: message.data,
				title: false,
			},
			'ERR_NETWORKError',
		];
	}
	if (message instanceof ECONNREFUSEDError) {
		return [
			{
				status: message.status,
				message: message.message,
				data: message.data,
				title: false,
			},
			'ECONNREFUSEDError',
		];
	}
	if (message instanceof CannError) {
		return [
			{
				status: message.status,
				message: message.message,
				data: message.data,
			},
			'CannError',
		];
	}
	if (message instanceof Error) {
		return [
			{
				message: message.message,
			},
			message.name || 'Internal Error',
		];
	}
	return [
		{
			message: JSON.stringify(message),
		},
		'',
	];
};
