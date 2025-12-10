import * as yup from 'yup';

const schema = yup.object().shape({
	id: yup.number(),
	name: yup.string(),
	contactEmail: yup.string(),
	contactTelephone: yup.string(),
	countryId: yup.number(),
	stateId: yup.number(),
	cityId: yup.number(),
	address: yup.string(),
	logo: yup.string(),
	masterUserId: yup.string(),
});

export default schema;
