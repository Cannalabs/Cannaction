export interface FormValues {
	id: number | undefined;
	name: string;
	lastName?: string;
	nickname?: string;
	email?: string;
	password?: string;
	newPassword?: string;
	repeatNewPassword?: string;
	newEmail?: string;
	languageId?: number | undefined;
	profilePic?: string | undefined;
}
