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
import { useSnackbar } from '../../../../../contexts/Snackbar';
import UserEntity from '../../../../../models/entities/UserEntity';
import { UpdateUserProfileRequest } from '../../../../../dtos/requests/UpdateUserProfileRequest';

import UserService from '../../../../../services/UserService';
import { UserTypeEnum } from '../../../../../models/enums/userType.enum';
import { useTranslation } from 'react-i18next';

export const FormAccountProfile: React.FC = () => {
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
		password: undefined,
		newPassword: undefined,
		repeatNewPassword: undefined,
		newEmail: '',
		languageId: user.language.id,
		profilePic: user.profilePic,
	});

	const composeRequestBody = (values: FormValues): UpdateUserProfileRequest => ({
		name: values.name,
		lastName: values.lastName,
		nickname: values.nickname,
		password: values.password,
		newPassword: values.newPassword,
		repeatNewPassword: values.repeatNewPassword,
		newEmail: values.newEmail,
		languageId: values.languageId,
	});

	const onSubmit = async (values: FormValues) => {
		if (
			!!values.password &&
			!values.newPassword  &&
			!values.repeatNewPassword
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
				{data?.userType === UserTypeEnum.STORE && (
					<div className="card mb-3">
						<div className="card-body p-4">
							<div className="row align-items-center justify-content-between">
								<h2 className="text-primary">Store: {data?.store?.name}</h2>
							</div>
						</div>
					</div>
				)}
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
