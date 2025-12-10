import { UserTypeEnum } from "../../models/enums/userType.enum";

export class FilterUserLabeledDto {
	countryId?: number;
	userType?: UserTypeEnum;
	active?: boolean;
}
