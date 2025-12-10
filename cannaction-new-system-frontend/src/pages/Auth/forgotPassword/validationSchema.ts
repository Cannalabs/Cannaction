import * as yup from 'yup';

export const validationSchema = yup.object({
	nickname: yup.string().required(),
	forgotEmail: yup.string().required(),
});
