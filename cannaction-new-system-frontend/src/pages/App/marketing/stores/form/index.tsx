import { Button } from '@mui/material';
import { motion } from 'framer-motion';
import React, { useEffect } from 'react';
import { StoreLogo } from '../thumb';
import { Information } from '../information';
import { useFormik } from 'formik';
import FormikHook from '../../../../../models/interfaces/FormikHook';
import FormValues from './formValues';
import { initialValues } from './initialValues';
import validationSchema from './schema';
import { useNavigate, useParams } from 'react-router-dom';
import { useStore } from '../../../../../hooks/querys/store/useStore';
import { useSnackbar } from '../../../../../contexts/Snackbar';
import { StoreEntity } from '../../../../../models/entities/StoreEntity';
import UpdateStoreByMarketingRequest from '../../../../../dtos/requests/UpdateStoreByMarketingRequest';
import CreateStoreRequest from '../../../../../dtos/requests/CreateStoreRequest';

import StoreService from '../../../../../services/StoreService';
import { useTranslation } from 'react-i18next';

interface Props {
	isDetails: boolean;
}

export const FormStore: React.FC<Props> = ({ isDetails }) => {
	const { id } = useParams();

	const storeId = Number(id);
	const {
		data: store,
		isLoading,
		refetch,
		isRefetching,
	} = useStore(id ? +id : undefined);
	const navigate = useNavigate();
	const { openSnackbar } = useSnackbar();
	const { t } = useTranslation();

	useEffect(() => {
		refetch();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const composeFormValues = (store: StoreEntity): FormValues => ({
		id: store.id,
		name: store.name,
		contactEmail: store.contactEmail,
		contactTelephone: store.contactTelephone,
		countryId: store.country.id,
		stateId: store.state?.id,
		cityId: store.city?.id,
		address: store.address,
		logo: store.logo ?? '',
		masterUserId: store.masterUser?.id ?? undefined ,
		workers: store.workers.map((w) => w.id),
	});

	const composeRequestBody = (
		values: FormValues
	): CreateStoreRequest | UpdateStoreByMarketingRequest => ({
		countryId: values.countryId,
		storeName: values.name,
		stateId: values.stateId ?? undefined,
		cityId: values.cityId ?? undefined,
		storeAddress: values.address ?? undefined,
		storeContactTelephone: values.contactTelephone,
		storeContactEmail: values.contactEmail,
		masterUserId: values.masterUserId ?? 0,
		workers: values.workers,
	});

	const onSubmit = async (values: FormValues) => {
		if (!values.name) {
			openSnackbar(t('marketing.addStore.storeNameMandatory'), 'error');
			return;
		}
		if (!values.countryId) {
			openSnackbar(t('marketing.addStore.storeCountryMandatory'), 'error');
			return;
		}
		try {
			setSubmitting(true);
			if (id) {
				await StoreService.updateByMarketing(
					+id,
					composeRequestBody(values) as UpdateStoreByMarketingRequest
				);
			} else {
				await StoreService.createByMarketing(
					composeRequestBody(values) as CreateStoreRequest
				);
			}
			navigate(-1);
			openSnackbar(`${t('marketing.Stores.storesTableStoreColumn')} ${id ? t('marketing.addStore.storeCreated') : t('marketing.addStore.storeUpdated')}`, 'success');
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
		if (!store) {
			resetForm({ values: initialValues });
			return;
		}
		resetForm({ values: composeFormValues(store) });
	}, [store, resetForm]);

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
				<StoreLogo
					refetch={refetch}
					setSubmitting={setSubmitting}
					formik={formik}
					loading={loading}
					storeId={storeId}
				/>
				<Information
					isDetails={isDetails || isLoading || isRefetching}
					formik={formik}
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
