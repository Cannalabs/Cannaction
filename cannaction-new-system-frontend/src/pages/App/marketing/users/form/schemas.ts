import * as yup from 'yup';
import { UserTypeEnum } from '../../../../../models/enums/userType.enum';

export const validationSchema = yup.object().shape({
	id: yup.number(),

	name: yup.string(),
	lastName: yup.string(),
	nickname: yup.string(),
	email: yup.string(),
	languageId: yup.string(),
	terms: yup.string(),
	privacy: yup.string(),
	countryId: yup.number(),
	userCity: yup.string(),
	storeId: yup.number(),
	userBirthdate: yup.string(),
	userTelephone: yup.string(),
	// password: yup.string(),
	confirmPassword: yup.string(),
	address: yup.string(),
	// state: yup.string(),
	// city: yup.string(),
	userType: yup.string().default(UserTypeEnum.STORE),
});
