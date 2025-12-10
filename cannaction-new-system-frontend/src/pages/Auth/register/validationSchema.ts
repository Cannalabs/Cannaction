import * as yup from 'yup';

const validationSchema = yup.object({
	userType: yup.string().required(),
	languageId: yup.number().default(1).required(),
	name: yup.string().required(),
	lastName: yup.string().required(),
	nickname: yup.string().required(),
	countryId: yup.number().default(2).required(),
	storeId: yup.number().default(2).required(),
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
	stateId: yup.number().default(1),
	cityId: yup.number().default(1),
	storeContactEmail: yup.string(),
	storeContactTelephone: yup.string(),
	storeName: yup.string(),
	address: yup.string(),
	storeAddress: yup.string(),
});

export default validationSchema;
