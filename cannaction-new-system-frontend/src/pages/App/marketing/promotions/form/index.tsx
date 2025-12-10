import { Button } from '@mui/material';
import React, { useEffect } from 'react';
import { FormValues } from './formValues';
import { PromotionEntity } from '../../../../../models/entities/PromotionEntity';
import { useFormik } from 'formik';
import FormikHook from '../../../../../models/interfaces/FormikHook';
import { initialValues } from './initialValues';
import validationSchema from './schema';
import { ThumbContainer } from '../thumb';
import { Information } from '../information';
import { motion } from 'framer-motion';
import {
	setPromotion,
	usePromotion,
} from '../../../../../hooks/querys/promotion/usePromotion';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from '../../../../../contexts/Snackbar';
import { CreatePromotionRequest } from '../../../../../dtos/requests/CreatePromotionRequest';
import { UpdatePromotionRequest } from '../../../../../dtos/requests/UpdatePromotionRequest';
import PromotionService from '../../../../../services/PromotionService';
import { useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../../../../contexts/Auth';
import { UserTypeEnum } from '../../../../../models/enums/userType.enum';

export const FormPromotion: React.FC = () => {
	const { id } = useParams();
	const promotionId = Number(id);
	const {
		data: promotion,
		isLoading,
		isRefetching,
		refetch,
	} = usePromotion(id ? +id : undefined);
	const { userTypeLogged, userCountry } = useAuth();
	const navigate = useNavigate();
	const { openSnackbar } = useSnackbar();
	const { t } = useTranslation();

	const composeFormValues = (promotion: PromotionEntity): FormValues => ({
		id: promotion.id,
		name: promotion.name,
		maxCoupons: promotion.maxCoupons,
		countryId: promotion.country.id,
		emailText: promotion.emailText,
		beginDate: promotion.beginDate,
		finalDate: promotion.finalDate,
		itemId: promotion.item.id,
		storeIds: promotion.stores.map((s) => s.id),
		thumb: promotion.thumb,
	});

	const composeRequestBody = (
		values: FormValues
	): CreatePromotionRequest | UpdatePromotionRequest => ({
		name: values.name,
		emailText: values.emailText,
		maxCoupons: values.maxCoupons,
		countryId: userTypeLogged === UserTypeEnum.MARKETING ? userCountry : values.countryId,
		beginDate: values.beginDate,
		finalDate: values.finalDate,
		itemId: values.itemId,
		storeIds: values.storeIds,
	});

	const create = (values: FormValues) =>
		PromotionService.createPromotion(
			composeRequestBody(values) as CreatePromotionRequest
		);

	const update = (values: FormValues) => {
		if (!values.id) return;
		PromotionService.updatePromotion(
			values.id,
			composeRequestBody(values) as UpdatePromotionRequest
		);
	};

	const { mutateAsync } = useMutation(
		async (values: FormValues) => (values.id ? update(values) : create(values)),
		{
			onSuccess: (entity) => {
				setPromotion(entity);
				const action = id ? 'updated' : 'created';
				openSnackbar(`Promotion successfully ${action}`, 'success');
				navigate(-1);
			},
			retry: 1,
		}
	);

	const onSubmit = async (values: FormValues) => {
		setSubmitting(true);
		try {
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
		if (!promotion) {
			resetForm({ values: initialValues });
			return;
		}
		resetForm({ values: composeFormValues(promotion) });
	};

	useEffect(() => {
		if (!promotion) {
			resetForm({ values: initialValues });
			return;
		}
		resetForm({ values: composeFormValues(promotion) });
	}, [promotion, resetForm]);

	const loading = isLoading || isSubmitting || isRefetching;

	const handleRefetch = () => {
		refetch();
	};

	return (
		<motion.form
			initial={{ y: 10, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			exit={{ y: -10, opacity: 0 }}
			transition={{ duration: 0.2 }}
			autoComplete="off"
		>
			<div className="row gx-4">
				<ThumbContainer
					formik={formik}
					promotionId={promotionId}
					loading={loading}
					isDetails={false}
					handleRefetch={handleRefetch}
					setSubmitting={setSubmitting}
				/>
				<Information
					formik={formik}
					isLoading={isLoading}
					isRefetching={isRefetching}
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
									handleReset();
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
