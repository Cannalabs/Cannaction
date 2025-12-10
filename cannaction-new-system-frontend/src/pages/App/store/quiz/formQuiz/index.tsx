import { Button, Divider, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuestions } from '../../../../../hooks/querys/question/useQuestions';
import { TypeText } from './TypeText';
import { TypeSelect } from './TypeSelect';
import { QuestionEntity } from '../../../../../models/entities/QuestionEntity';
import { QuestionType } from '../../../../../models/enums/questionType.enum';
import { useAuth } from '../../../../../contexts/Auth';
import { Answer } from '../../../../../dtos/requests/AnswerQuizRequest';
import { useSnackbar } from '../../../../../contexts/Snackbar';
import QuizService from '../../../../../services/QuizService';
import { useTranslation } from 'react-i18next';

export const FormQuizStore: React.FC = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const { userLoggedId } = useAuth();
	const [loading, setLoading] = useState(false);
	const [answerList, setAnswerList] = useState<Answer[]>([]);
	const { openSnackbar } = useSnackbar();
	const { t } = useTranslation();

	const { data, isRefetching, isLoading } = useQuestions(
		id as unknown as number
	);

	const renderQuestion = (question: QuestionEntity, index: number) => {
		switch (question.type) {
			case QuestionType.TEXT:
				return (
					<TypeText
						key={question.id}
						question={question}
						disabled={isRefetching || isLoading}
						handlePushAnswer={handlePushAnswer}
						loading={loading}
						index={index}
					/>
				);
			case QuestionType.SELECT:
				return (
					<TypeSelect
						key={question.id}
						question={question}
						disabled={isRefetching || isLoading}
						handlePushAnswer={handlePushAnswer}
						loading={loading}
						index={index}
					/>
				);
			default:
				return null;
		}
	};

	const handlePushAnswer = (questionId: number, answer: string | null) => {
		const answers = answerList.filter((a) => a.questionId != questionId);
		if (answer) {
			answers.push({ questionId, answer });
		}
		setAnswerList(answers);
	};

	const handleAnswerQuiz = async () => {
		if (data && answerList.length < data?.length) {
			openSnackbar(
				'You must answer all questions before submiting the quiz!',
				'error'
			);
			return;
		} else {
			setLoading(true);
			try {
				await QuizService.answerQuiz({
					quizId: id as unknown as number,
					userId: userLoggedId as unknown as number,
					answers: answerList,
				});
				openSnackbar('Answers saved sucessfully!', 'success');
				navigate(-1);
			} catch (e) {
				openSnackbar(e, 'error');
			}
		}
	};

	return (
		<motion.form
			initial={{ y: 10, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			exit={{ y: -10, opacity: 0 }}
			transition={{ duration: 0.2 }}
		>
			<Grid
				container
				justifyContent="space-between"
				alignContent={'flex-start'}
				bgcolor={'#FFFFFF'}
				borderRadius={'8px'}
				boxShadow="0.15rem 0 1.75rem 0 rgba(33, 40, 50, 0.15)"
			>
				<Grid
					bgcolor={'#F8F8F9'}
					sx={{ borderTopLeftRadius: '6px', borderTopRightRadius: '6px' }}
					container
					justifyContent="space-between"
					alignItems="center"
					p={2}
					height={'60px'}
					borderBottom={'1px solid lightgray'}
				/>
				-{' '}
				<Grid
					container
					p={2}
					flexWrap={'wrap'}
					justifyContent={'center'}
					alignItems={'flex-start'}
					gap={2}
				>
					<Grid
						width={'60%'}
						container
						alignItems={'center'}
						justifyItems={'center'}
						justifyContent="center"
						p={2}
						gap={2}
					>
						{data?.map((question, index) => renderQuestion(question, index))}
						<Divider sx={{ width: '100%', marginTop: '1rem' }} />
						<Grid justifyContent={'flex-end'} container>
							<Button
								onClick={handleAnswerQuiz}
								variant="contained"
								disabled={loading}
								sx={{ height: 45, textTransform: 'capitalize' }}
							>
								{t('marketing.addPromotion.submitButton')}
							</Button>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</motion.form>
	);
};
