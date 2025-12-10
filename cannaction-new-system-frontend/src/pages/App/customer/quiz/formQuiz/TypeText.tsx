import { Grid, Typography, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { QuestionEntity } from '../../../../../models/entities/QuestionEntity';
import { useTranslation } from 'react-i18next';

interface Props {
	question: QuestionEntity;
	disabled: boolean;
	handlePushAnswer: (questionId: number, answer: string) => void;
	loading: boolean;
	index: number;
}

export const TypeText: React.FC<Props> = ({
	question,
	disabled,
	handlePushAnswer,
	loading,
	index,
}) => {
	const [inputValue, setInputValue] = useState<string>('');
	const [error, setError] = useState<boolean>(false);
	const { t } = useTranslation();

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		setInputValue(value);
		setError(value.trim() === '');
	};

	useEffect(() => {
		if (loading && !inputValue) {
			setError(true);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [loading]);

	useEffect(() => {
		handlePushAnswer(question.id, inputValue);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [inputValue]);

	return (
		<>
			<Grid
				container
				justifyContent={'center'}
				alignContent={'flex-start'}
				direction={'column'}
				mt={2}
			>
				<Typography variant="h4" color={'primary'}>
					{t('customer.quizPage.question')} {index + 1}
				</Typography>
				<Typography variant="h4">{question.question}</Typography>
			</Grid>
			<Grid item xs={12}>
				<TextField
					name="description"
					disabled={disabled}
					size="small"
					placeholder="Your answer:"
					fullWidth
					value={inputValue}
					onChange={handleInputChange}
					error={error}
					helperText={error ? 'This field is required.' : ''}
					sx={{ width: '100%' }}
				/>
			</Grid>
		</>
	);
};
