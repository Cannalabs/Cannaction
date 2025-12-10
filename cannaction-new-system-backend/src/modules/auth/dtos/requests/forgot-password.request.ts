import { IsNotEmpty } from 'class-validator';

export class ForgotPasswordRequest {
	@IsNotEmpty({ message: 'Email is mandatory.' })
	email: string;
}
