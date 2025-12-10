import { Grid } from '@mui/material';
import React, { useEffect } from 'react';
import { FormValues } from './formValues';
import { useFormik } from 'formik';
import FormikHook from '../../../../../models/interfaces/FormikHook';
import { initialValues } from './initialValues';
import validationSchema from './schema';
import { motion } from 'framer-motion';
import { ItemEntity } from '../../../../../models/entities/ItemEntity';
import { ThumbContainer } from '../thumb';
import { Information } from '../information';
import { setItem, useItem } from '../../../../../hooks/querys/item/useItem';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { CreateItemRequest } from '../../../../../dtos/requests/CreateItemRequest';
import { UpdateItemRequest } from '../../../../../dtos/requests/UpdateItemRequest';
import ItemService from '../../../../../services/ItemService';
import { useMutation } from '@tanstack/react-query';
import { useSnackbar } from '../../../../../contexts/Snackbar';


interface Props {
	isDetails: boolean;
}

export const FormProductAvailableStore: React.FC<Props> = ({ isDetails }) => {
	const { id } = useParams();
	const { data: item, isLoading, refetch } = useItem(id ? +id : undefined);
	const navigate = useNavigate();

	const location = useLocation();
	const { openSnackbar } = useSnackbar();

	const composeFormValues = (item: ItemEntity): FormValues => ({
		id: item.id,
		name: item.name,
		description: item.description,
		type: item.type,
		active: item.active,
		barCode: item.barCode,
		maxCoupon: item.maxCoupon,
		points: item.points,
		dots: item.dots,
		image: item.image,
		size: item.size,
	});

	const composeRequestBody = (
		values: FormValues
	): CreateItemRequest | UpdateItemRequest => ({
		name: values.name,
		description: values.description,
		type: values.type,
		barCode: values.barCode,
		maxCoupon: values.maxCoupon,
		points: values.points,
		dots: values.dots || undefined,
		image: values.image,
		size: values.size,
	});

	const create = (values: FormValues) =>
		ItemService.createItem(composeRequestBody(values) as CreateItemRequest);

	const update = (values: FormValues) => {
		if (!values.id) return;
		ItemService.updateItem(
			values.id,
			composeRequestBody(values) as UpdateItemRequest
		);
	};

	const { mutateAsync } = useMutation(
		async (values: FormValues) => (values.id ? update(values) : create(values)),
		{
			onSuccess: (entity) => {
				setItem(entity);
				const action = id ? 'updated' : 'created';
				openSnackbar(`Product successfully ${action}`, 'success');
				if (location.pathname === '/add-item') {
					navigate(`/detail-item/${entity?.id}`);
				}
			},
			retry: 1,
		}
	);

	const onSubmit = async (values: FormValues) => {
		setSubmitting(true);
		try {
			await mutateAsync(values);
		}catch (e: unknown) {
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
		if (!item) {
			resetForm({ values: initialValues });
			return;
		}
		resetForm({ values: composeFormValues(item) });
	}, [item, resetForm]);

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
					formik={formik}
					itemId={item?.id ?? 0}
					loading={isSubmitting}
					handleRefetch={handleRefetch}
					setSubmitting={setSubmitting}
					isDetails={false}
				/>
				<Information
					formik={formik}
					isDetails={isDetails}
					isLoading={isSubmitting || isLoading}
				/>
			</div>
		</motion.form>
	);
};
