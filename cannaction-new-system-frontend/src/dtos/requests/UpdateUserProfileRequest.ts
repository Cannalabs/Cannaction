export interface UpdateUserProfileRequest {
	name?: string;
	lastName?: string;
	nickname?: string;
	password?: string;
	languageId?: number;
	birthdate?: string;
	gender?: string;
	newEmail?: string;
    newPassword?: string;
    repeatNewPassword?: string;
}
