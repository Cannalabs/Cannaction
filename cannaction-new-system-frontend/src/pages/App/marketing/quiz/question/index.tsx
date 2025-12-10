import {
	Grid,
	TextField,
	Button,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Tooltip,
} from '@mui/material';
import React from 'react';
import { BsPlus, BsTrash3 } from 'react-icons/bs';
import { QuestionType } from '../../../../../models/enums/questionType.enum';
import FormValues, { Question as QuestionForm } from '../form/formValues';
import {
	FormikHandleChange,
	FormikSetFieldValue,
} from '../../../../../models/interfaces/FormikHook';
import { useTranslation } from 'react-i18next';

interface Props {
	quizId: number | undefined;
	index: number;
	value: QuestionForm;
	onRemove: (key: number) => void;
	setFieldValue: FormikSetFieldValue<FormValues>;
	handleChange: FormikHandleChange;
	handleAdd: () => void;
}

export const Question: React.FC<Props> = ({
	quizId,
	index,
	value,
	onRemove,
	setFieldValue,
	handleAdd,
}) => {
	const { t } = useTranslation();
	return (
		<>
			<Grid item xs={10}>
				<TextField
					placeholder={t('marketing.addQuiz.questionText')}
					label={t('marketing.addQuiz.questionText')}
					fullWidth
					onChange={(e) =>
						setFieldValue(`questions.${index}.question`, e.target.value)
					}
					value={value.question}
					name={`questions.${index}.question`}
				/>
			</Grid>
			{!quizId && (
				<Grid item>
					{index === 0 ? (
						<Tooltip title={t('marketing.addQuiz.addQuestion')} placement="top">
							<Button
								variant="contained"
								sx={{ height: 35, width: '100px' }}
								onClick={() => handleAdd()}
							>
								<BsPlus size={22} />
							</Button>
						</Tooltip>
					) : (
						<Tooltip title={t('marketing.addQuiz.removeQuestion')} placement="top">
							<Button
								variant="contained"
								sx={{ height: 35, width: '100px' }}
								color="error"
								onClick={(e) => {
									e.preventDefault();
									onRemove(value.id);
								}}
							>
								<BsTrash3 size={16} />
							</Button>
						</Tooltip>
					)}
				</Grid>
			)}

			<Grid item xs={12}>
				<FormControl fullWidth>
					<InputLabel style={{ fontSize: '0.8rem' }}>
						{t('marketing.addQuiz.typeQuestion')}
					</InputLabel>
					<Select
						label={t('marketing.addQuiz.typeQuestion')}
						value={value.type || QuestionType.TEXT}
						name={`questions.${index}.type`}
						onChange={(e) => {
							const value = e.target.value as string;
							setFieldValue(
								`questions.${index}.type`,
								value === '' ? null : (value as QuestionType)
							);
						}}
					>
						<MenuItem style={{ fontSize: '0.8rem' }} value={QuestionType.TEXT}>
							{t('marketing.addQuiz.text')}
						</MenuItem>
						<MenuItem style={{ fontSize: '0.8rem' }} value={QuestionType.SELECT}>
							{t('marketing.addQuiz.select')}
						</MenuItem>
					</Select>
				</FormControl>
				<Grid item xs={12} mt={2}>
					{value.type === QuestionType.SELECT && (
						<TextField
							multiline
							fullWidth
							value={value.options}
							onChange={(e) =>
								setFieldValue(`questions.${index}.options`, e.target.value)
							}
							rows={2}
							helperText={`${t('marketing.addQuiz.separateQuestions')} ( ; ).`}
						/>
					)}
				</Grid>
			</Grid>
		</>
	);
};
