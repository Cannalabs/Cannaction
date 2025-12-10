import React, { useEffect, useState } from 'react';
import { FormValues } from '../form/formValues';
import FormikHook from '../../../../../models/interfaces/FormikHook';
import img from '../../../../../assets/cannaction-logo.png';
import PromotionService from '../../../../../services/PromotionService';
import ImageUploader from '../../../../../components/imageUploader';
import { useSnackbar } from '../../../../../contexts/Snackbar';

interface Props {
	formik: FormikHook<FormValues>;
	loading: boolean;
	isDetails: boolean;
	promotionId: number;
	handleRefetch: () => void;
	setSubmitting: (isSubmitting: boolean) => void;
}

export const ThumbContainer: React.FC<Props> = ({
	formik: { values },
	loading,
	promotionId,
	isDetails,
	handleRefetch,
	setSubmitting,
}) => {
	const [selectedImage, setSelectedImage] = useState<string>();
	const { openSnackbar } = useSnackbar();

	useEffect(() => {
		if (values.thumb) {
			setSelectedImage(values.thumb);
		} else {
			setSelectedImage(img);
		}
	}, [values.thumb]);

	const handleFileUploaded = async (file: File) => {
		try {
			await PromotionService.updatePromotionThumb(promotionId, file);
			openSnackbar('Promotion Thumb updated successfully!', 'success');
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
			title="Promotion Thumb"
			loading={loading}
			tooltipText="Select image upload only images with .jpg, .jpeg, .png and gif extension and size less than 150kb, max width: 1024px, and max height: 768px"
			selectedImage={selectedImage}
			onFileUploaded={handleFileUploaded}
			isDetails={isDetails}
			entityId={promotionId}
			imageUrl={values.thumb}
			showButton={false}
		/>
	);
};
