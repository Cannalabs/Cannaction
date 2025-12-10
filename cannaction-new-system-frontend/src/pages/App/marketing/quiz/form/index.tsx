import { Button, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import React, { useEffect } from 'react';
import FormikHook from '../../../../../models/interfaces/FormikHook';
import { useFormik } from 'formik';
import FormValues from './formValues';
import initialValues from './initialValues';
import validationSchema from './schema';
import { Information } from '../information';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuiz } from '../../../../../hooks/querys/quiz/useQuiz';
import QuizzEntity from '../../../../../models/entities/QuizEntity';
import { CreateQuizRequest } from '../../../../../dtos/requests/CreateQuizRequest';
import { UpdateQuizRequest } from '../../../../../dtos/requests/UpdateQuizRequest';
import QuizService from '../../../../../services/QuizService';
import { useMutation } from '@tanstack/react-query';
import { useSnackbar } from '../../../../../contexts/Snackbar';
import { useTranslation } from 'react-i18next';

export const FormQuiz: React.FC = () => {
	const { id } = useParams();
	const idQuiz = Number(id);
	const navigate = useNavigate();
	const { data: quiz, isLoading, isRefetching } = useQuiz(idQuiz);
	const { openSnackbar } = useSnackbar();
	const { t } = useTranslation();

	const composeFormValues = (quiz: QuizzEntity): FormValues => ({
		id: quiz.id,
		description: quiz.description,
		points: quiz.points,
		countryId: quiz.country.id,
		questions: quiz.questions.map((q) => ({
			id: q.id,
			question: q.question,
			type: q.type,
			options: q.options.join('; '),
			text: q.question,
		})),
	});

	const composeRequestBody = (
		values: FormValues
	): CreateQuizRequest | UpdateQuizRequest => ({
		description: values.description,
		points: values.points,
		countryId: values.countryId,
		questions: values.questions.map((q) => ({
			id: q.id,
			question: q.question,
			type: q.type,
			options: q.options?.replace(/; /g, ';').split(';') ?? [],
		})),
	});

	const create = (values: FormValues) =>
		QuizService.createQuiz(composeRequestBody(values) as CreateQuizRequest);

	const update = (values: FormValues) => {
		if (!values.id) return;
		QuizService.updateQuiz(
			values.id,
			composeRequestBody(values) as UpdateQuizRequest
		);
	};

	const { mutateAsync } = useMutation(
		async (values: FormValues) => (values.id ? update(values) : create(values)),
		{
			onSuccess: () => {
				const action = id ? 'updated' : 'created';
				openSnackbar(`Quiz successfully ${action}`, 'success');
				navigate(-1);
			},
			retry: 1,
		}
	);

	const onSubmit = async (values: FormValues) => {
		setSubmitting(true);
		try {
			if (!values.countryId) {
				openSnackbar(`Country is mandatory!`, 'error');
				return;
			}
			if (!values.points) {
				openSnackbar('Points is mandatory!', 'error');
				return;
			}
			if (!values.description || values.description === '') {
				openSnackbar('Quiz name is mandatory!', 'error');
				return;
			}
			for (const question of values.questions) {
				if (!question.question || question.question === '') {
					openSnackbar(`Question number ${question.id} not filled!`, 'error');
					return;
				}
			}
			await mutateAsync(values);
		} catch (e: unknown) {
			openSnackbar(e, 'error');
		} finally {
			setSubmitting(false);
		}
	};

	const formik: FormikHook<FormValues> = useFormik<FormValues>({
		initialValues,
		validationSchema,
		onSubmit,
	});

	const { resetForm, isSubmitting, setSubmitting } = formik;

	const handleReset = (e?: React.FormEvent<HTMLFormElement>) => {
		if (e) e.preventDefault();
		if (!quiz) {
			resetForm({ values: initialValues });
			return;
		}
		resetForm({ values: composeFormValues(quiz) });
	};

	useEffect(() => {
		if (!quiz) {
			resetForm({ values: initialValues });
			return;
		}
		resetForm({ values: composeFormValues(quiz) });
	}, [quiz, resetForm]);

	return (
		<motion.form
			initial={{ y: 10, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			exit={{ y: -10, opacity: 0 }}
			transition={{ duration: 0.2 }}
			autoComplete="off"
		>
			<Grid container p={2} justifyContent={'center'}>
				<Information formik={formik} />
				<Grid
					container
					p={2}
					justifyContent={'flex-end'}
					height={30}
					gap={2}
					sx={{
						maxWidth: '67%',
					}}
				>
					<Button
						disabled={isRefetching || isLoading}
						onClick={() => {
							handleReset();
							navigate(-1);
						}}
						sx={{ textTransform: 'capitalize' }}
						variant="contained"
					>
						{t('marketing.addPromotion.cancelButton')}
					</Button>
					<Button
						disabled={isSubmitting || isLoading}
						onClick={() => onSubmit(formik.values)}
						sx={{ textTransform: 'capitalize' }}
						variant="contained"
					>
						{t('marketing.addPromotion.submitButton')}
					</Button>
				</Grid>
			</Grid>
		</motion.form>
	);
};
