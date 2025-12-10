import { QuestionType } from '../../../../../models/enums/questionType.enum';
import FormValues from '../form/formValues';

const initialValues: FormValues = {
	id: undefined,
	countryId: undefined,
	description: '',
	points: undefined,
	questions: [
		{
			id: 1,
			question: '',
			type: QuestionType.TEXT,
			options: '',
		},
	],
};

export default initialValues;
