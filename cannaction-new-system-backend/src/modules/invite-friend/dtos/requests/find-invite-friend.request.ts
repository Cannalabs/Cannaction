import { IsOptional } from "class-validator";

export class FindInviteFriendRequest {
	@IsOptional()
	search?: string;
}