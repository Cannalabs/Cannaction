import isPropValid from '@emotion/is-prop-valid';
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { StyleSheetManager } from 'styled-components';
import { DragDrop, TextInputFile } from './styles';
import { Typography } from '@mui/material';

interface DropzoneProps {
	onFileUploaded: (file: File) => void;
	entityId: number;
}

export const Dropzone: React.FC<DropzoneProps> = ({
	onFileUploaded,
	entityId,
}) => {
	const [selectedFileUrl, setSelectedFileUrl] = useState('');
	const [fileName, setFileName] = useState('');

	const onDrop = useCallback(
		(acceptedFiles: File[]) => {
			const file = acceptedFiles[0];
			const fileUrl = URL.createObjectURL(file);
			setSelectedFileUrl(fileUrl);
			setFileName(file.name);

			onFileUploaded(file);
		},
		[onFileUploaded]
	);
	const { getRootProps, getInputProps } = useDropzone({
		onDrop,
	});
	return (
		<StyleSheetManager shouldForwardProp={isPropValid}>
			<DragDrop {...getRootProps()} hasFile={selectedFileUrl} disabled={!entityId}>
				<TextInputFile {...getInputProps()} disabled={!entityId} />
				<Typography variant="subtitle1" color={'grey'}>
					Select an image
				</Typography>
			</DragDrop>
		</StyleSheetManager>
	);
};
