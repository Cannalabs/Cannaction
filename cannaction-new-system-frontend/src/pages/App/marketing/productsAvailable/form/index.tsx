import { Button } from '@mui/material';
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
import { useNavigate, useParams } from 'react-router-dom';
import { CreateItemRequest } from '../../../../../dtos/requests/CreateItemRequest';
import { UpdateItemRequest } from '../../../../../dtos/requests/UpdateItemRequest';
import ItemService from '../../../../../services/ItemService';
import { useMutation } from '@tanstack/react-query';
import { useSnackbar } from '../../../../../contexts/Snackbar';
import { useTranslation } from 'react-i18next';

interface Props {
	isDetails: boolean;
}

export const FormProductAvailable: React.FC<Props> = ({ isDetails }) => {
	const { id } = useParams();
	const itemId = Number(id);
	const {
		data: item,
		isLoading,
		isRefetching,
		refetch,
	} = useItem(id ? +id : undefined);
	const navigate = useNavigate();
	const { openSnackbar } = useSnackbar();
	const { t } = useTranslation();

	const composeFormValues = (item: ItemEntity): FormValues => ({
		id: item.id,
		name: item.name,
		exchange: item.exchange,
		description: item.description,
		type: item.type,
		active: item.active,
		points: item.points,
		dots: item.dots,
		image: item.image,
		size: item.size,
		storeIds: item.stores.map((s) => s.id),
		barcodes:
			item.barcodes?.map((b) => ({
				barcode: b.barcode,
				country: {
					id: b.country.id,
					name: b.country.name,
				},
			})) || [],
	});

	const composeRequestBody = (
		values: FormValues
	): CreateItemRequest | UpdateItemRequest => ({
		name: values.name,
		description: values.description,
		type: values.type,
		points: values.points!,
		dots: values.dots || undefined,
		exchange: values.exchange,
		image: values.image,
		size: values.size,
		storeIds: values.storeIds,
		barcodes:
			values.barcodes?.map((b) => ({
				barcode: b.barcode,
				country: {
					id: b.country.id,
					name: b.country.name,
				},
			})) || [],
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
		if (!item) {
			resetForm({ values: initialValues });
			return;
		}
		resetForm({ values: composeFormValues(item) });
	};

	useEffect(() => {
		if (!item) {
			resetForm({ values: initialValues });
			return;
		}
		resetForm({ values: composeFormValues(item) });
	}, [item, resetForm]);

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
					itemId={itemId}
					loading={loading}
					isDetails={isDetails}
					handleRefetch={handleRefetch}
					setSubmitting={setSubmitting}
				/>
				<Information
					formik={formik}
					isDetails={isDetails}
					isLoading={isSubmitting || isLoading}
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
