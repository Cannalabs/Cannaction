import { IsNotEmpty } from "class-validator";

export class CreateInviteFriendRequest {
	@IsNotEmpty({ message: 'Email for invitation is mandatory.' })
	email: string;
}