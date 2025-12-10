import { UserType } from '@/modules/user/enums/user-type.enum';
import {
	createParamDecorator,
	ExecutionContext,
	UnauthorizedException,
} from '@nestjs/common';

export interface CurrentUser {
	userId: number;
	userType: UserType;
	userCountry: number;
}

export const ReqCurrentUser = createParamDecorator(
	(data: unknown, ctx: ExecutionContext) => {
		const request = ctx.switchToHttp().getRequest();
		if (
			!request.headers.userid ||
			!request.headers.usertype ||
			!request.headers.usercountry
		)
			throw new UnauthorizedException();
		const currentUser: CurrentUser = {
			userId: +request.headers.userid,
			userType: request.headers.usertype,
			userCountry: +request.headers.usercountry,
		};
		return currentUser;
	}
);
