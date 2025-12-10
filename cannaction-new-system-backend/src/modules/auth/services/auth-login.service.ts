import env from '@/config/env';
import { UserNotFoundError } from '@/modules/user/errors/user-not-found.error';
import { UserPersistenceService } from '@/modules/user/services/user-persistence.service';
import { UserService } from '@/modules/user/services/user.service';
import { generateTemporaryPassword, hash } from '@/utils/crypto';
import { createForgotPasswordEmail, sendMail } from '@/utils/mail';
import { Injectable } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { ForgotPasswordRequest } from '../dtos/requests/forgot-password.request';
import { LoginRequest } from '../dtos/requests/login.request';
import { LoginResponse } from '../dtos/responses/login.response';
import { InactiveUserError } from '../errors/inactive-user.error';
import { InvalidLoginError } from '../errors/invalid-login.error';

@Injectable()
export class AuthLoginService {
	constructor(
		private readonly userService: UserService,
		private readonly userPersistenceService: UserPersistenceService,
		private readonly jwtService: JwtService
	) {}

	async login(body: LoginRequest): Promise<LoginResponse> {
		const user = await this.userService.findForAuth(body.emailOrNickname);
		if (!user) throw new InvalidLoginError();
		if (!user.active) throw new InactiveUserError();

		const success = await compare(body.password, user.password);
		if (!success) throw new InvalidLoginError();

		const options: JwtSignOptions = {
			secret: env.JWT_SECRET,
		};

		options.expiresIn = 28800;

		const accessToken = await this.jwtService.signAsync(
			{
				sub: user.id,
				expiresIn: 28800,
			},
			options
		);

		await this.userPersistenceService.updateLastInteractionDate(user.id);

		return {
			accessToken,
			userType: user.userType,
			userId: user.id.toString(),
			userCountry: user.country.id.toString(),
			userLanguage: user.language.code,
		};
	}

	async forgotPassword(body: ForgotPasswordRequest): Promise<void> {
		const user = await this.userService.findForForgotPassword(
			body.email);
		if (!user) throw new UserNotFoundError();
		if (!user.active) throw new InactiveUserError();

		const newPassword = generateTemporaryPassword();

		const hashPassword = await hash(newPassword);

		const updatedUser = { ...user, password: hashPassword };
		await this.userPersistenceService.update(user.id, updatedUser);

		try {
			await sendMail(
				body.email,
				'Forgot Password',
				createForgotPasswordEmail(newPassword)
			);
		} catch (e) {
			console.log(e)
		}
	}

	async getClubCardUserForLogin(code: string) {
		const user = await this.userService.findClubCardUserForLogin(code);
		if (!user) return null;
		if (!user.password) return undefined;
		return user.code;
	}
}
