import * as yup from 'yup';
import { UserTypeEnum } from '../../../models/enums/userType.enum';

const validationSchema = yup.object({
	userType: yup.string().required(),
	languageId: yup.number().required('Language is required'),
	name: yup.string().required(),
	lastName: yup.string().required(),
	nickname: yup.string().required(),
	countryId: yup.number().required('Country is required'),
	storeId: yup.number().when('userType', {
		is: UserTypeEnum.CUSTOMER,
		then: (schema) => 
			schema
				.required('Store is required for customer users')
				.min(1, 'Store is required for customer users'),
		otherwise: (schema) => schema.notRequired(),
	}),
	email: yup.string().email().required(),
	password: yup.string().required(),
	confirmPassword: yup
		.string()
		.required()
		.oneOf([yup.ref('password')], 'Passwords must match'),
	terms: yup.boolean().oneOf([true], 'You must agree to the terms').required(),
	privacy: yup
		.boolean()
		.oneOf([true], 'You must agree to the privacy policy')
		.required(),

	// store
	birthdate: yup.string(),
	telephone: yup.string(),
	stateId: yup.number(),
	cityId: yup.number(),
	storeContactEmail: yup.string(),
	storeContactTelephone: yup.string(),
	storeName: yup.string(),
	address: yup.string(),
	storeAddress: yup.string(),
});

export default validationSchema;
