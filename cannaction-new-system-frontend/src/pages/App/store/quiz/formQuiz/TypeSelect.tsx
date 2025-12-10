import { Grid, Typography, Autocomplete, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { StyledPatterInput } from '../../../../../components/customSelect/styles';
import { QuestionEntity } from '../../../../../models/entities/QuestionEntity';

interface Props {
	question: QuestionEntity;
	disabled: boolean;
	handlePushAnswer: (questionId: number, answer: string | null) => void;
	loading: boolean;
	index: number;
}

export const TypeSelect: React.FC<Props> = ({ question, disabled, handlePushAnswer, loading, index }) => {
	const [selectedValue, setSelectedValue] = useState<string | null>(null);
	const [error, setError] = useState<boolean>(false);

	const handleSelectChange = (
		// eslint-disable-next-line @typescript-eslint/ban-types
		_event: React.ChangeEvent<{}>,
		value: string | null
	) => {
		setSelectedValue(value);
		setError(value === null);
	};

	useEffect(() => {
		if (loading && !selectedValue) {
			setError(true);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [loading]);

	useEffect(() => {
		handlePushAnswer(question.id, selectedValue);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedValue]);

	return (
		<>
			<Grid
				container
				justifyContent={'center'}
				alignContent={'flex-start'}
				direction={'column'}
			>
				<Typography variant="h4" color={'primary'}>
					Question {index + 1}
				</Typography>
				<Typography variant="h4">{question.question}</Typography>
			</Grid>

			<Grid xs={12}>
				<Autocomplete
					size="small"
					disabled={disabled}
					disablePortal
					sx={StyledPatterInput}
					options={question.options ?? []}
					fullWidth
					value={selectedValue}
					onChange={handleSelectChange}
					renderInput={(params) => (
						<TextField
							{...params}
							variant="outlined"
							placeholder="Select an option:"
							error={error}
							helperText={error ? 'This field is required.' : ''}
						/>
					)}
				/>
			</Grid>
		</>
	);
};
