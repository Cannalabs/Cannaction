import {
	Grid,
	TextField,
} from '@mui/material';
import React from 'react';

const style = {
	'& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
		border: 'none',
		transition: 'background 0.3s ease',
	},
	background: '#f2f6fc',
	borderRadius: '8px',
};

interface Props {
	folderName: string;
	setFolderName: (name: string) => void;
}

export const FolderForm: React.FC<Props> = ({folderName, setFolderName}) => {
	return (
		<Grid
			container
			p={2}
			justifyContent={'space-between'}
			gap={2}
			borderBottom="1px solid lightgray"
		>
			<TextField
				sx={style}
				fullWidth
				value={folderName}
				onChange={(e) => setFolderName(e.target.value)}
				label="Folder Name"
				size="small"
				placeholder="Folder Name"
			/>
		</Grid>
	);
};
