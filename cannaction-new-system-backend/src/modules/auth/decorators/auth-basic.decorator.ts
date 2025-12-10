import { applyDecorators, UseGuards } from '@nestjs/common';
import { BasicAuthGuard } from '../guards/basic.guard';

export const AuthBasic = () => {
	return applyDecorators(UseGuards(BasicAuthGuard));
};
