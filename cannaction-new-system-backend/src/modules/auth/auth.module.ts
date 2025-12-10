import env from '@/config/env';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthLoginService } from './services/auth-login.service';
import { BasicStrategy } from './strategies/basic.strategy';

@Module({
	imports: [
		UserModule,
		JwtModule.register({ global: true, secret: env.JWT_SECRET }),
	],
	providers: [AuthLoginService, BasicStrategy],
	controllers: [AuthController],
	exports: [],
})
export class AuthModule {}
