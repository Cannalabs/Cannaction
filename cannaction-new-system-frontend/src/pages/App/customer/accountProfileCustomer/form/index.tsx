import { motion } from 'framer-motion';
import React, { useEffect } from 'react';
import { Information } from '../information';
import { ProfilePicture } from '../profilePicture';
import { FormValues } from './FormValues';
import { initialValues } from './initialValues';
import validationSchema from './schema';
import { useFormik } from 'formik';
import FormikHook from '../../../../../models/interfaces/FormikHook';
import { useParams } from 'react-router-dom';
import { useUser } from '../../../../../hooks/querys/user/useUser';
import UserService from '../../../../../services/UserService';
import { UpdateUserProfileRequest } from '../../../../../dtos/requests/UpdateUserProfileRequest';
import UserEntity from '../../../../../models/entities/UserEntity';
import { useSnackbar } from '../../../../../contexts/Snackbar';
import { useTranslation } from 'react-i18next';

export const FormAccountProfileCustomer: React.FC = () => {
	const { id } = useParams();
	const { data, refetch, isRefetching, isLoading } = useUser(Number(id));
	const { openSnackbar } = useSnackbar();
	const { t } = useTranslation();

	const composeFormValues = (user: UserEntity): FormValues => ({
		id: user.id,
		name: user.name,
		lastName: user.lastName,
		nickname: user.nickname,
		email: user.email,
		birthDate: user.birthdate,
		gender: user.gender,
		password: undefined,
		newPassword: undefined,
		repeatNewPassword: undefined,
		newEmail: undefined,
		languageId: user.language.id,
		profilePic: user.profilePic,
	});

	const composeRequestBody = (values: FormValues): UpdateUserProfileRequest => ({
		name: values.name,
		lastName: values.lastName,
		birthdate: values.birthDate,
		nickname: values.nickname,
		password: values.password,
		gender: values.gender,
		newPassword: values.newPassword,
		repeatNewPassword: values.repeatNewPassword,
		newEmail: values.newEmail,
		languageId: values.languageId,
	});

	const onSubmit = async (values: FormValues) => {
		if (
			values.password !== undefined &&
			values.newPassword == undefined &&
			values.repeatNewPassword == undefined
		) {
			openSnackbar(t('accountProfile.informNewPassword'), 'error');
			return;
		}
		if (values.newPassword !== values.repeatNewPassword) {
			openSnackbar(t('accountProfile.passwordsMatch'), 'error');
			return;
		}
		setSubmitting(true);
		try {
			await UserService.updateUserProfile(Number(id), composeRequestBody(values));
			openSnackbar(`User profile updated successfully!`, 'success');
			formik.setFieldValue('password', undefined);
			formik.setFieldValue('newPassword', undefined);
			formik.setFieldValue('repeatNewPassword', undefined);
			refetch();
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

	useEffect(() => {
		if (!data) {
			resetForm({ values: initialValues });
			return;
		}
		resetForm({ values: composeFormValues(data) });
	}, [data, resetForm]);

	const loading = isLoading || isSubmitting || isRefetching;

	return (
		<motion.form
			initial={{ y: 10, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			exit={{ y: -10, opacity: 0 }}
			transition={{ duration: 0.2 }}
			autoComplete="off"
			style={{ width: '100%' }}
		>
			<div className="container-xl px-4 mt-4">
				<div className="row">
					<ProfilePicture
						formik={formik}
						userId={Number(id)}
						loading={loading}
						refetch={refetch}
						setSubmitting={setSubmitting}
					/>
					<Information formik={formik} isLoading={loading} onSubmit={onSubmit} />
				</div>
			</div>
		</motion.form>
	);
};
