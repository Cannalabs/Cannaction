import { UserTypeEnum } from "../../models/enums/userType.enum";

export interface CreateArchiveRequest {
    name: string;
	folderId: number;
	file: FormData;
	countryId?: number;
	userType?: UserTypeEnum;
}