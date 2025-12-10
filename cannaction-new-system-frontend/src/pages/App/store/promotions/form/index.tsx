import { Grid } from '@mui/material';
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
import { useParams } from 'react-router-dom';
import { usePromotion } from '../../../../../hooks/querys/promotion/usePromotion';

export const FormPromotionStore: React.FC = () => {
	const { id } = useParams();
	const promotionId = Number(id);
	const {
		data: promotion,
		isLoading,
		refetch,
		isRefetching,
	} = usePromotion(id ? +id : undefined);

	const composeFormValues = (promotion: PromotionEntity): FormValues => ({
		id: promotion.id,
		name: promotion.name,
		coupons: promotion.coupons ?? '',
		countryId: promotion.country.id,
		emailText: promotion.emailText,
		beginDate: promotion.beginDate,
		finalDate: promotion.finalDate,
		itemId: promotion.item.id,
		thumb: promotion.thumb,
	});
	const onSubmit = () => {};

	const formik: FormikHook<FormValues> = useFormik<FormValues>({
		initialValues,
		validationSchema,
		onSubmit,
	});

	const { resetForm, isSubmitting, setSubmitting } = formik;

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
		>
			<div className="row gx-4">
				<ThumbContainer
					promotionId={promotionId}
					formik={formik}
					loading={loading}
					handleRefetch={handleRefetch}
					setSubmitting={setSubmitting}
					isDetails={false}
				/>
				<Information
					formik={formik}
					itemName={promotion ? promotion.item.name : ''}
				/>
			</div>
		</motion.form>
	);
};
