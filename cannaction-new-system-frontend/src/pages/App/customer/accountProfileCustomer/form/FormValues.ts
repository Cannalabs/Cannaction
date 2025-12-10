export interface FormValues {
	id: number | undefined;
	name: string;
	lastName?: string;
	nickname?: string;
	email?: string;
	password?: string;
	languageId?: number | undefined;
	profilePic?: string | undefined;
	birthDate?: string;
	gender?: string;	
	newPassword?: string;
	repeatNewPassword?: string;
	newEmail?: string;
}
