import React, { useRef } from 'react';
import {
	CircularProgress,
	IconButton,
	Typography,
	Tooltip,
} from '@mui/material';
import { BsInfoCircle } from 'react-icons/bs';
import { useTranslation } from 'react-i18next';

interface ImageUploaderProps {
	title: string;
	loading: boolean;
	tooltipText: string;
	selectedImage?: string;
	onFileUploaded: (file: File) => void;
	isDetails: boolean;
	entityId?: number;
	imageUrl?: string;
	showButton?: boolean;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
	title,
	loading,
	tooltipText,
	selectedImage,
	onFileUploaded,
	isDetails,
	imageUrl,
	showButton = true,
	entityId
}) => {
	const fileInputRef = useRef<HTMLInputElement | null>(null);
	const {t} = useTranslation();

	const handleUploadClick = () => {
		if (fileInputRef.current) {
			fileInputRef.current.click();
		}
	};

	const hasImage = imageUrl && imageUrl.trim() !== '' ? imageUrl : selectedImage;

	return (
		<div className="col-lg-4">
			<div className="card card-header-actions mb-4">
				<div className="card-header">
					{title}
					<Tooltip placement="top" title={tooltipText} className="text-muted">
						<IconButton>
							<BsInfoCircle size={16} />
						</IconButton>
					</Tooltip>
				</div>
				<div
					className="card-body"
					style={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<label className="picture">
						<span className="picture-image"></span>
					</label>
					{hasImage ? (
						<img
							src={`${hasImage}?t=${new Date().getTime()}`}
							style={{ maxHeight: '200px', maxWidth: '100%', borderRadius: '8px' }}
							alt="Uploaded"
						/>
					) : (
						<Typography
							variant="body1"
							color="textSecondary"
							style={{ marginTop: '16px' }}
						>
							{entityId ? t('general.noImage') : t('general.createFirst')}
						</Typography>
					)}
					{loading ? (
						<CircularProgress size={24} style={{ marginTop: '16px' }} />
					) : (
						showButton && (
							<>
								<button
									className="btn btn-primary"
									type="button"
									onClick={handleUploadClick}
									disabled={loading || isDetails}
									style={{ marginTop: '16px' }}
								>
									{t('general.uploadNewImage')}
								</button>
								<input
									type="file"
									accept=".jpg,.jpeg,.png,.gif"
									ref={fileInputRef}
									style={{ display: 'none' }}
									onChange={(e) => {
										if (e.target.files) {
											onFileUploaded(e.target.files[0]);
										}
									}}
								/>
							</>
						)
					)}
				</div>
			</div>
		</div>
	);
};

export default ImageUploader;
