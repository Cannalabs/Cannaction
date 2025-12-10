import * as yup from 'yup';

const schema = yup.object().shape({
	id: yup.number(),
	name: yup.string(),
	lastName: yup.string(),
	nickname: yup.string(),
	email: yup.string().email(),
	password: yup.string(),
	languageId: yup.number(),
});
export default schema;
