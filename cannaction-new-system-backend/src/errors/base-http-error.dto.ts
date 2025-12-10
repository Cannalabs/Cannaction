import { HttpException } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class BaseHttpError extends HttpException {
	@ApiProperty({ example: 'generic' })
	@IsString()
	readonly code: string;

	@ApiProperty({ example: 'Internal Server Error' })
	@IsString()
	readonly message: string;

	@ApiPropertyOptional()
	@IsNumber()
	readonly data?: unknown;

	constructor(
		status: number = 500,
		code: string = 'generic',
		message: string = 'Internal Server Error',
		data?: unknown
	) {
		super(message, status);
		this.code = code;
		this.message = message;
		this.data = data;
	}
}
