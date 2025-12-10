import { UserTypeEnum } from "../enums/userType.enum";
import CountryEntity from "./CountryEntity";
import { FolderEntity } from "./FolderEntity";

export interface ArchiveEntity {
	id: number;
	name: string;
	folder: FolderEntity;
	userType?: UserTypeEnum;
	country?: CountryEntity;
	patch: string;
	createdAt: string;
	updatedAt: string;
}