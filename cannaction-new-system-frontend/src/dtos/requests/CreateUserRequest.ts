// src/dtos/requests/CreateUserRequest.ts

import { UserTypeEnum } from '../../models/enums/userType.enum';

export default interface CreateUserRequest {
	name: string;
	lastName: string;
	email: string;
	nickname: string;
	password?: string;
	telephone?: string;
	birthdate?: string;
	userType: UserTypeEnum;
	languageId?: number;
	storeId?: number;
	countryId: number;
	storeName?: string;
	stateId?: number;
	cityId?: number;
	storeAddress?: string; 
	storeContactTelephone?: string;
	storeContactEmail?: string;
	newsletter?: boolean;
}
