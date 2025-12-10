import { IsNotEmpty } from 'class-validator';

export class LoginRequest {
	@IsNotEmpty({ message: 'Email or Nickname is mandatory.' })
	emailOrNickname: string;

	@IsNotEmpty({ message: 'Password is mandatory.' })
	password: string;
}
