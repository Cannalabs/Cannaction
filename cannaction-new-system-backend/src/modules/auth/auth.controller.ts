import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AuthBasic } from './decorators/auth-basic.decorator';
import { ForgotPasswordRequest } from './dtos/requests/forgot-password.request';
import { LoginRequest } from './dtos/requests/login.request';
import { LoginResponse } from './dtos/responses/login.response';
import { AuthLoginService } from './services/auth-login.service';

@Controller('auth')
export class AuthController {
	constructor(private readonly authLoginService: AuthLoginService) {}

	@Post()
	@AuthBasic()
	public async login(@Body() body: LoginRequest): Promise<LoginResponse> {
		return this.authLoginService.login(body);
	}

	@Post('forgot-password')
	@AuthBasic()
	public async forgotPassword(
		@Body() body: ForgotPasswordRequest
	): Promise<void> {
		await this.authLoginService.forgotPassword(body);
	}

	@Get(':code/club-card-login')
	@AuthBasic()
	public async getClubCardUserForLogin(@Param('code') code: string) {
		return this.authLoginService.getClubCardUserForLogin(code);
	}
}
