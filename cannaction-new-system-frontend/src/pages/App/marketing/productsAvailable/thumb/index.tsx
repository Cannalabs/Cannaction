import React, { useEffect, useState } from 'react';
import { FormValues } from '../form/formValues';
import FormikHook from '../../../../../models/interfaces/FormikHook';
import ItemService from '../../../../../services/ItemService';
import { useSnackbar } from '../../../../../contexts/Snackbar';
import ImageUploader from '../../../../../components/imageUploader';
import { useTranslation } from 'react-i18next';

interface Props {
	formik: FormikHook<FormValues>;
	itemId: number;
	loading: boolean;
	isDetails: boolean;
	handleRefetch: () => void;
	setSubmitting: (isSubmitting: boolean) => void;
}

export const ThumbContainer: React.FC<Props> = ({
	formik: { values },
	itemId,
	loading,
	isDetails,
	handleRefetch,
	setSubmitting,
}) => {
	const { openSnackbar } = useSnackbar();
	const [selectedImage, setSelectedImage] = useState<string>();
	const { t } = useTranslation();

	useEffect(() => {
		if (values.image) {
			setSelectedImage(values.image);
		}
	}, [values.image]);

	const handleFileUploaded = async (file: File) => {
		try {
			await ItemService.updateItemImage(itemId, file);
			openSnackbar(t('marketing.addProduct.itemThumbUpdate'), 'success');
			setSubmitting(true);
			handleRefetch();
		} catch (e: unknown) {
			openSnackbar(e, 'error');
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<ImageUploader
			title={t('marketing.addProduct.productThumb')}
			loading={loading}
			tooltipText={t('general.informationIcon.icon')}
			selectedImage={selectedImage}
			onFileUploaded={handleFileUploaded}
			isDetails={isDetails}
			entityId={itemId}
			imageUrl={values.image}
			showButton={values.id != undefined}
		/>
	);
};
