import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { BasicStrategy as Strategy } from 'passport-http';
import env from '../../../config/env';

@Injectable()
export class BasicStrategy extends PassportStrategy(Strategy, 'basic') {
	constructor() {
		super();
	}

	async validate(username: string, password: string) {
		if (
			(env.BASIC_PASS || '') === password &&
			(env.BASIC_USER || '') === username
		) {
			return true;
		}
		throw new UnauthorizedException();
	}
}
