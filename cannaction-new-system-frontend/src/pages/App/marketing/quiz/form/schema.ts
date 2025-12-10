import * as yup from 'yup';
import { QuestionType } from '../../../../../models/enums/questionType.enum';

const validationSchema = yup.object().shape({
	id: yup.number(),
	description: yup.string().required('Question description is mandatory!'),
	points: yup.number().required(),
	visible: yup.boolean(),
	countryId: yup.number().required(),
	questions: yup.object().shape({
		question: yup.string().required(),
		typeQuestion: yup.string().default(QuestionType.TEXT),
	}),
});

export default validationSchema;
