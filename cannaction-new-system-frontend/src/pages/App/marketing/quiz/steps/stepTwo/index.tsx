import { Grid, Typography } from '@mui/material';
import React from 'react';
import { QuestionType } from '../../../../../../models/enums/questionType.enum';
import FormikHook from '../../../../../../models/interfaces/FormikHook';
import FormValues, {
	Question as FormValuesQuestion,
} from '../../form/formValues';

import { v4 as uuidv4 } from 'uuid';
import { Question } from '../../question';

interface Props {
	formik: FormikHook<FormValues>;
}

export const Questions: React.FC<Props> = ({
	formik: { handleChange, setFieldValue, values, errors, touched },
}) => {
	const handleAddQuestion = () => {
		const question = Array.isArray(values.questions) ? values.questions : [];
		setFieldValue('questions', [
			...question,
			{
				key: uuidv4(),
				question: '',
				typeQuestion: QuestionType.TEXT,
				options: [],
			} as FormValuesQuestion,
		]);
	};

	const handleRemoveQuestion = (key: string) => {
		setFieldValue(
			'questions',
			values.questions.filter((question) => question.key !== key)
		);
	};

	return (
		<Grid
			width={'60%'}
			container
			alignItems={'center'}
			justifyItems={'center'}
			justifyContent="center"
			p={2}
			gap={2}
		>
			<Grid
				container
				justifyContent={'center'}
				alignContent={'flex-start'}
				direction={'column'}
			>
				<Typography variant="h4" color={'grey'} fontWeight="bold">
					Step 2
				</Typography>
				<Typography variant="h5">Create your quiz questions</Typography>
			</Grid>
			{values.questions.map((question, index) => (
				<Question
					index={index}
					value={question}
					setFieldValue={setFieldValue}
					handleChange={handleChange}
					onRemove={handleRemoveQuestion}
					handleAdd={handleAddQuestion}
				/>
			))}
		</Grid>
	);
};
