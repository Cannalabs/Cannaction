import CloseIcon from '@mui/icons-material/Close';
import { Button, Grid, IconButton, Typography } from '@mui/material';
import Modal from '@mui/material/Modal';
import { Box, useTheme } from '@mui/system';
import React from 'react';

interface Props {
	title: string;
	open: boolean;
	handleClose: () => void;
	children?: React.ReactNode;
}

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 500,
	boxShadow: 24,
	height: 270,
	borderRadius: 2,
	backgroundColor: '#fff',
};

export const ActionModal: React.FC<Props> = ({
	title,
	open,
	handleClose,
	children,
}) => {
	const theme = useTheme();

	return (
		<Modal
			open={open}
			onClose={handleClose}
			style={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				overflow: 'auto',
			}}
		>
			<Box sx={style}>
				<Grid
					container
					sx={{
						borderBottom: '1px solid lightgray',

						p: 2,
					}}
				>
					<IconButton
						onClick={() => {
							handleClose();
						}}
						style={{
							position: 'absolute',
							right: 8,
							top: 8,
							color: 'gray',
						}}
					> 
						<CloseIcon />
					</IconButton>
					<Typography
						variant="subtitle1"
						style={{
							textAlign: 'start',
							color: theme.palette.primary[200],
						}}
					>
						{title}
					</Typography>
				</Grid>
				{children}

				<Grid
					container
					justifyContent={'flex-end'}
					mt={2}
					p={2}
					sx={{ borderTop: '1px solid lightGray' }}
				>
					<Button variant="contained" onClick={() => handleClose()}>
						Close
					</Button>
				</Grid>
			</Box>
		</Modal>
	);
};
