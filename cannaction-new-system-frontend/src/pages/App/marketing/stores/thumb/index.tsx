import React, { useEffect, useState } from 'react';
import FormValues from '../form/formValues';
import FormikHook from '../../../../../models/interfaces/FormikHook';
import img from '../../../../../assets/img/illustrations/profiles/user-placeholder.svg';
import { useSnackbar } from '../../../../../contexts/Snackbar';
import ImageUploader from '../../../../../components/imageUploader';
import StoreService from '../../../../../services/StoreService';
import { useTranslation } from 'react-i18next';

interface Props {
	formik: FormikHook<FormValues>;
	storeId: number;
	loading: boolean;
	refetch: () => void;
	setSubmitting: (isSubmitting: boolean) => void;
}

export const StoreLogo: React.FC<Props> = ({
	formik: { values },
	storeId,
	loading,
	refetch,
	setSubmitting,
}) => {
	const { openSnackbar } = useSnackbar();
	const [selectedImage, setSelectedImage] = useState<string>(img);
	const {t} = useTranslation();

	useEffect(() => {
		if (values.logo) {
			setSelectedImage(values.logo);
		}
	}, [values.logo]);

	const handleFileUploaded = async (file: File) => {
		setSubmitting(true);
		try {
			await StoreService.updateStoreLogo(storeId, file);
			openSnackbar(t('marketing.addStore.storeLogoUpdated'), 'success');
			refetch();
		} catch (e: unknown) {
			openSnackbar(e, 'error');
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<ImageUploader
			title={t('marketing.addStore.promotionThumb')}
			loading={loading}
			tooltipText={t('general.informationIcon.icon')}
			selectedImage={selectedImage}
			onFileUploaded={handleFileUploaded}
			isDetails={false}
			entityId={storeId}
			imageUrl={values.logo}
			showButton={values.id != undefined}
		/>
	);
};
