import React, { ReactNode } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid, IconButton } from '@mui/material';
import { BsXLg } from '../../../themes/icons';
import { useTheme } from '@mui/system';

const styledBox = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: '90vw',
	maxWidth: '600px',
	height: '400px',
	bgcolor: 'background.paper',
	boxShadow: 24,
	borderRadius: '8px',
};

const styledHead = {
	backgroundColor: '#1b7f75',
	backgroundImage:
		'linear-gradient(135deg, #1b7f75 0%, rgba(0, 43, 38, 0.8) 100%)',
	borderTopLeftRadius: '8px',
	borderTopRightRadius: '8px',
	alignItems: 'center',
	flexWrap: 'nowrap',
	height: '57px',
	p: 2,
};

interface Props {
	open: boolean;
	handleClose: () => void;
	handleSave?: () => void;
	children: ReactNode;
	title?: string;
	hideSave?: boolean;
	hideClose?: boolean;
	loading?: boolean;
	isScan?: boolean;
}

export const MoreInformationModal: React.FC<Props> = ({
	open,
	handleClose,
	handleSave,
	children,
	loading,
	title,
	hideSave,
	isScan,
	hideClose,
}) => {
	const theme = useTheme();
	const grey = theme.palette.grey[50];

	return (
		<Modal
			aria-labelledby="transition-modal-title"
			aria-describedby="transition-modal-description"
			open={open}
			onClose={handleClose}
			closeAfterTransition
			slots={{ backdrop: Backdrop }}
			slotProps={{
				backdrop: {
					timeout: 500,
				},
			}}
		>
			<Fade in={open}>
				<Box sx={styledBox}>
					<Grid container justifyContent="space-between" sx={styledHead}>
						<Typography variant="h4" component="h2" color={grey}>
							{title}
						</Typography>
						<IconButton onClick={() => handleClose()}>
							<BsXLg color={grey} />
						</IconButton>
					</Grid>
					{children}
					<Grid container justifyContent={'flex-end'} gap={2} pb={4} pr={2} pt={2}>
						{!hideClose && (
							<Button
								disabled={loading}
								onClick={() => handleClose()}
								variant="contained"
							>
								Close
							</Button>
						)}
						{!hideSave && (
							<Button
								disabled={loading}
								variant="contained"
								onClick={() => (handleSave ? handleSave() : handleClose())}
							>
								{isScan ? 'Search' : 'Save'}
							</Button>
						)}
					</Grid>
				</Box>
			</Fade>
		</Modal>
	);
};
