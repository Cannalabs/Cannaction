import { Grid, Typography, Autocomplete, TextField } from '@mui/material';
import React, { useEffect } from 'react';
import { StyledPatterInput } from '../../../../../components/customSelect/styles';
import FormikHook from '../../../../../models/interfaces/FormikHook';
import FormValues, { Question as FormValuesQuestion } from '../form/formValues';
import { useCountriesLabeled } from '../../../../../hooks/querys/country/useCountryLabeled';
import { QuestionType } from '../../../../../models/enums/questionType.enum';
import { Question } from '../question';
import { useAuth } from '../../../../../contexts/Auth';
import { UserTypeEnum } from '../../../../../models/enums/userType.enum';
import useDisableNumberInputScroll from '../../../../../hooks/useDisabledScrollNumberInput';
import { useTranslation } from 'react-i18next';

interface Props {
	formik: FormikHook<FormValues>;
}

export const Information: React.FC<Props> = ({
	formik: { handleChange, values, setFieldValue },
}) => {
	const { userTypeLogged, userCountry } = useAuth();
	useDisableNumberInputScroll();
	const { countries } = useCountriesLabeled();
	const { t } = useTranslation();

	useEffect(() => {
		if (userTypeLogged !== UserTypeEnum.SUPER) {
			setFieldValue('countryId', userCountry);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [values]);

	const handleAddQuestion = () => {
		const question = Array.isArray(values.questions) ? values.questions : [];
		setFieldValue('questions', [
			...question,
			{
				id: values.questions.length + 1,
				question: '',
				type: QuestionType.TEXT,
				options: '',
				text: '',
			} as FormValuesQuestion,
		]);
	};

	const handleRemoveQuestion = (id: number) => {
		setFieldValue(
			'questions',
			values.questions.filter((question) => question.id !== id)
		);
	};

	return (
		<Grid
			container
			justifyContent="space-between"
			alignContent={'flex-start'}
			bgcolor={'#FFFFFF'}
			borderRadius={'8px'}
			boxShadow="0.15rem 0 1.75rem 0 rgba(33, 40, 50, 0.15)"
			spacing={{ xs: 2, md: 3 }}
			columns={{ xs: 4, sm: 8, md: 12 }}
			xs={8}
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
			>
				<Typography color="primary" variant="h4">
					{t('marketing.addQuiz.quizInfo')}
				</Typography>
			</Grid>
			<Grid
				container
				p={2}
				flexWrap={'wrap'}
				justifyContent={'space-between'}
				alignItems={'flex-start'}
				gap={2}
			>
				<Grid item xs={18}>
					<TextField
						name="description"
						value={values.description}
						onChange={handleChange}
						placeholder={t('marketing.addQuiz.quizName')}
						label={t('marketing.addQuiz.quizName')}
						fullWidth
					/>
				</Grid>

				<Grid item xs={4}>
					<TextField
						type="number"
						name="points"
						value={values.points}
						onChange={handleChange}
						placeholder={t('marketing.storesSetting.pointsTablePointsColumn')}
						label={t('marketing.storesSetting.pointsTablePointsColumn')}
						fullWidth
					/>
				</Grid>

				<Grid xs={7.5}>
					<Autocomplete
						disablePortal
						sx={StyledPatterInput}
						disabled={userTypeLogged !== UserTypeEnum.SUPER}
						options={countries}
						value={
							userTypeLogged !== UserTypeEnum.SUPER
								? countries.find((c) => c.value === userCountry)
								: countries.find((c) => c.value === values.countryId) || null
						}
						onChange={(_, value) => setFieldValue('countryId', value?.value)}
						renderInput={(params) => (
							<TextField
								{...params}
								variant="outlined"
								value={countries}
								placeholder={t('marketing.users.CountryDropDown')}
								label={t('marketing.users.CountryDropDown')}
							/>
						)}
					/>
				</Grid>
				{values.questions.map((question, index) => (
					<Question
						quizId={values.id}
						index={index}
						value={question}
						setFieldValue={setFieldValue}
						handleChange={handleChange}
						onRemove={handleRemoveQuestion}
						handleAdd={handleAddQuestion}
					/>
				))}
			</Grid>
		</Grid>
	);
};
