import { motion } from 'framer-motion';
import { Button } from '@mui/material';
import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import FormikHook from '../../../../../models/interfaces/FormikHook';
import { useHandleInitialValues } from './initialValues';
import FormValues from './formValues';
import UserEntity from '../../../../../models/entities/UserEntity';
import { UpdateUserRequest } from '../../../../../dtos/requests/UpdateUserRequest';
import { validationSchema } from './schemas';
import { UserProfilePic } from '../thumb';
import { Information } from '../information';
import { useNavigate, useParams } from 'react-router-dom';
import { useUser } from '../../../../../hooks/querys/user/useUser';
import CreateUserRequest from '../../../../../dtos/requests/CreateUserRequest';
import { useSnackbar } from '../../../../../contexts/Snackbar';
import UserService from '../../../../../services/UserService';
import { useTranslation } from 'react-i18next';

interface Props {
	isDetails: boolean;
}

export const FormUser: React.FC<Props> = ({ isDetails }) => {
	const { id } = useParams();
	const userId = Number(id);
	const {
		data: user,
		isLoading,
		refetch,
		isRefetching,
	} = useUser(id ? +id : undefined);
	const navigate = useNavigate();
	const { openSnackbar } = useSnackbar();
	const { t } = useTranslation();
	const { initialValues } = useHandleInitialValues();

	useEffect(() => {
		refetch();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const composeFormValues = (user: UserEntity): FormValues => ({
		id: user.id,
		name: user.name,
		lastName: user.lastName,
		nickname: user.nickname,
		email: user.email,
		role: user.userType,
		countryId: user.country.id,
		storeId: user.store?.id || undefined,
		newsLetter: user.newsletter,
		profilePic: user.profilePic ?? '',
		password: '',
	});

	const composeRequestBody = (
		values: FormValues
	): CreateUserRequest | UpdateUserRequest => ({
		name: values.name,
		lastName: values.lastName,
		nickname: values.nickname,
		email: values.email,
		userType: values.role,
		countryId: values.countryId,
		storeId: values.storeId,
		newsletter: values.newsLetter,
		password: values.password,
	});

	const onSubmit = async (values: FormValues) => {
		if (!values.countryId) {
			openSnackbar('Country is mandatory!', 'error');
			return;
		}
		if (!values.name) {
			openSnackbar('First name is mandatory!', 'error');
			return;
		}
		if (!values.lastName) {
			openSnackbar('Last Name is mandatory!', 'error');
			return;
		}
		if (!values.nickname) {
			openSnackbar('Nickname is mandatory!', 'error');
			return;
		}
		if (!values.email) {
			openSnackbar('Email is mandatory!', 'error');
			return;
		}

		try {
			if (id) {
				await UserService.updateByMarketing(
					+id,
					composeRequestBody(values) as UpdateUserRequest
				);
			} else {
				await UserService.createByMarketing(
					composeRequestBody(values) as CreateUserRequest
				);
			}
			navigate(-1);
			openSnackbar(`User ${id ? 'updated' : 'created'} successfully!`, 'success');
		} catch (e: unknown) {
			openSnackbar(e, 'error');
		}
	};

	const formik: FormikHook<FormValues> = useFormik<FormValues>({
		initialValues,
		validationSchema,
		onSubmit,
	});

	const { resetForm, isSubmitting, setSubmitting } = formik;

	useEffect(() => {
		if (!user) {
			resetForm({ values: initialValues });
			return;
		}
		resetForm({ values: composeFormValues(user) });
	}, [user, resetForm]);

	const loading = isLoading || isSubmitting || isRefetching;

	return (
		<motion.form
			initial={{ y: 10, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			exit={{ y: -10, opacity: 0 }}
			transition={{ duration: 0.2 }}
			autoComplete="off"
		>
			<div className="row gx-4">
				<UserProfilePic
					refetch={refetch}
					setSubmitting={setSubmitting}
					formik={formik}
					loading={loading}
					userId={userId}
				/>
				<Information
					points={user ? user.points : undefined}
					formik={formik}
					isDetails={isDetails || isLoading || isRefetching}
				/>
			</div>

			<div className="mb-3">
				<div className="row">
					<div className="col justify-content-end">
						<div
							className="float-sm-end"
							style={{
								display: 'flex',
								gap: '1rem',
							}}
						>
							<Button
								disabled={isSubmitting || isLoading}
								onClick={() => {
									navigate(-1);
								}}
								sx={{ textTransform: 'capitalize' }}
								variant="contained"
								className="btn btn-primary btn-sm"
							>
								{t('marketing.addPromotion.cancelButton')}
							</Button>
							<Button
								disabled={isSubmitting || isLoading}
								onClick={() => onSubmit(formik.values)}
								sx={{ textTransform: 'capitalize' }}
								variant="contained"
								className="btn btn-primary btn-sm"
							>
								{t('marketing.addPromotion.submitButton')}
							</Button>
						</div>
					</div>
				</div>
			</div>
		</motion.form>
	);
};
