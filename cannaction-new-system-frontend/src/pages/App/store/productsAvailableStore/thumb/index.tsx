import React, { useEffect, useState } from 'react';
import { FormValues } from '../form/formValues';
import FormikHook from '../../../../../models/interfaces/FormikHook';
import ImageUploader from '../../../../../components/imageUploader';
import ItemService from '../../../../../services/ItemService';
import { useSnackbar } from '../../../../../contexts/Snackbar';

interface Props {
	formik: FormikHook<FormValues>;
	loading: boolean;
	itemId: number;
	isDetails: boolean;
	handleRefetch: () => void;
	setSubmitting: (isSubmitting: boolean) => void;
}

export const ThumbContainer: React.FC<Props> = ({
	formik: { values },
	loading,
	itemId,
	isDetails,
	handleRefetch,
	setSubmitting,
}) => {
	const [selectedImage, setSelectedImage] = useState<string>();
	const { openSnackbar } = useSnackbar();

	useEffect(() => {
		if (values.image) {
			setSelectedImage(values.image);
		}
	}, [values.image]);

	const handleFileUploaded = async (file: File) => {
		try {
			await ItemService.updateItemImage(itemId, file);
			openSnackbar('Item Thumb updated successfully!', 'success');
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
			title="Product Thumb"
			loading={loading}
			tooltipText="Select image upload only images with .jpg, .jpeg, .png and gif extension and size less than 150kb, max width: 1024px, and max height: 768px"
			selectedImage={selectedImage}
			onFileUploaded={handleFileUploaded}
			isDetails={isDetails}
			entityId={itemId}
			imageUrl={values.image}
			showButton={values.id != undefined}
		/>
	);
};
