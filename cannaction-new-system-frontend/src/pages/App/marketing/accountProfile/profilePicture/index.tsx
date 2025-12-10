import React, { useEffect, useState } from 'react';
import { FormValues } from '../form/FormValues';
import FormikHook from '../../../../../models/interfaces/FormikHook';
import img from '../../../../../assets/img/illustrations/profiles/user-placeholder.svg';
import { useSnackbar } from '../../../../../contexts/Snackbar';
import UserService from '../../../../../services/UserService';
import ImageUploader from '../../../../../components/imageUploader';

interface Props {
	formik: FormikHook<FormValues>;
	userId: number;
	loading: boolean;
	refetch: () => void;
	setSubmitting: (isSubmitting: boolean) => void;
}

export const ProfilePicture: React.FC<Props> = ({
	formik: { values },
	userId,
	loading,
	refetch,
	setSubmitting,
}) => {
	const { openSnackbar } = useSnackbar();
	const [selectedImage, setSelectedImage] = useState<string>(img);

	useEffect(() => {
		if (values.profilePic) {
			setSelectedImage(values.profilePic);
		}
	}, [values.profilePic]);

	const handleFileUploaded = async (file: File) => {
		setSubmitting(true);
		try {
			await UserService.updateUserProfilePic(userId, file);
			openSnackbar(t('marketing.addUser.userPicUpdated'), 'success');
			refetch();
		} catch (e: unknown) {
			openSnackbar(e, 'error');
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<ImageUploader
			title="Profile Pic"
			loading={loading}
			tooltipText="Select image upload only images with .jpg, .jpeg, .png and gif extension and size less than 150kb, max width: 1024px, and max height: 768px"
			selectedImage={selectedImage}
			onFileUploaded={handleFileUploaded}
			isDetails={false}
			entityId={userId}
			imageUrl={values.profilePic}
			showButton={values.id != undefined}
		/>
	);
};
