import { InviteStatus } from "../enums/inviteStatus.enum";
import UserEntity from "./UserEntity";

export interface InviteFriendEntity {
	id: number;
	email: string;
	status: InviteStatus;
	code: string;
	user: UserEntity;
	createdAt: string;
	updatedAt: string;
}
