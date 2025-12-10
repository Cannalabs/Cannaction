import React, { useEffect, useState } from 'react';
import { FormValues } from '../form/formValues';
import FormikHook from '../../../../../models/interfaces/FormikHook';
import { useSnackbar } from '../../../../../contexts/Snackbar';
import PromotionService from '../../../../../services/PromotionService';
import ImageUploader from '../../../../../components/imageUploader';
import { useTranslation } from 'react-i18next';

interface Props {
	formik: FormikHook<FormValues>;
	promotionId: number;
	loading: boolean;
	isDetails: boolean;
	handleRefetch: () => void;
	setSubmitting: (isSubmitting: boolean) => void;
}

export const ThumbContainer: React.FC<Props> = ({
	promotionId,
	formik: { values },
	loading,
	isDetails,
	handleRefetch,
	setSubmitting,
}) => {
	const { openSnackbar } = useSnackbar();
	const [selectedImage, setSelectedImage] = useState<string>();
	const { t } = useTranslation();

	useEffect(() => {
		if (values.thumb) {
			setSelectedImage(values.thumb);
		}
	}, [values.thumb]);

	const handleFileUploaded = async (file: File) => {
		try {
			await PromotionService.updatePromotionThumb(promotionId, file);
			openSnackbar(t('marketing.addPromotion.promotionThumbUpdate'), 'success');
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
			title={`${t('marketing.addPromotion.promotionThumb')}`}
			loading={loading}
			tooltipText={t('general.informationIcon.icon')}
			selectedImage={selectedImage}
			onFileUploaded={handleFileUploaded}
			isDetails={isDetails}
			entityId={promotionId}
			imageUrl={values.thumb}
			showButton={values.id != undefined}
		/>
	);
};
