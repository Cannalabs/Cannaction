import * as yup from 'yup';

const validationSchema = yup.object().shape({
	beginDate: yup.string(),
	endDate: yup.string(),
});
export default validationSchema;
