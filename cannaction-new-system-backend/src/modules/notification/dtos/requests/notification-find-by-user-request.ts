import { IsOptional } from "class-validator";

export class NotificationFindByUserRequest {
	@IsOptional()
	dashboard?: boolean;
}