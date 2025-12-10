import React, { useState } from 'react';
import FormModal from '../../../../components/formModal';
import { FolderForm } from './FolderForm';
import DownloadService from '../../../../services/DownloadService';
import { useSnackbar } from '../../../../contexts/Snackbar';


interface Props {
	title: string;
	modalOpen: boolean;
	handleClose: () => void;
	refetch: () => void;
}

export const AddFolder: React.FC<Props> = ({
	title,
	modalOpen,
	handleClose,
	refetch,
}) => {
	const [folderName, setFolderName] = useState<string>('');
	const { openSnackbar } = useSnackbar();

	const handleSubmit = async () => {
		try {
			await DownloadService.createFolder({name: folderName});
			openSnackbar('Folder created successfully!', 'success');
			refetch();
			handleClose();
		}catch (e: unknown) {
			openSnackbar(e, 'error');
		
		}
	};

	return (
		<FormModal
			title={title}
			open={modalOpen}
			handleClose={handleClose}
			handleSubmit={handleSubmit}
			loading={false}
		>
			<FolderForm folderName={folderName} setFolderName={setFolderName}/>
		</FormModal>
	);
};
