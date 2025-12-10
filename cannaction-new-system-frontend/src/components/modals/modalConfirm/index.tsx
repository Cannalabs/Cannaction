import Modal from '@mui/material/Modal';
import React from 'react';
import { BoxContent, Content } from '../styles';
import { Button, Grid, Typography } from '@mui/material';

interface Props {
	open: boolean;
	message: string;
	title?: string;
	cancelText?: string;
	confirmText?: string;
	onCancel?: () => void;
	onConfirm?: () => void;
}

const ModalConfirm: React.FC<Props> = ({
	open,
	message,
	title,
	cancelText = 'Cancel',
	confirmText = 'Confirm',
	onCancel,
	onConfirm,
}) => {
	return (
		<Modal open={open} onClose={onCancel}>
			<Content>
				<BoxContent>
					{title && (
						<Typography sx={{ textAlign: 'center' }} variant="h5">
							{title}
						</Typography>
					)}
					{title ? (
						<Typography variant="body1" sx={{ textAlign: 'center' }}>
							{message}
						</Typography>
					) : (
						<Typography variant="body1" sx={{ textAlign: 'center' }}>
							{message}
						</Typography>
					)}
				</BoxContent>

				<Grid container alignContent="center" justifyContent="space-around">
					<Button variant="contained" onClick={onCancel} color="error">
						{cancelText}
					</Button>
					<Button
						variant="contained"
						onClick={onConfirm}
						style={{ background: '#1b7f75' }}
					>
						{confirmText}
					</Button>
				</Grid>
			</Content>
		</Modal>
	);
};

export default ModalConfirm;
