import React, { useEffect, useState } from 'react';
import { FormValues } from '../form/FormValues';
import FormikHook from '../../../../../models/interfaces/FormikHook';
import img from '../../../../../assets/img/illustrations/profiles/user-placeholder.svg';
import { useSnackbar } from '../../../../../contexts/Snackbar';
import UserService from '../../../../../services/UserService';
import ImageUploader from '../../../../../components/imageUploader';
import { useTranslation } from 'react-i18next';

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
	const {t} = useTranslation();

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
			tooltipText={t('general.informationIcon.icon')}
			selectedImage={selectedImage}
			onFileUploaded={handleFileUploaded}
			isDetails={false}
			entityId={userId}
			imageUrl={values.profilePic}
			showButton={values.id != undefined}
		/>
	);
};
