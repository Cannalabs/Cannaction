import React from 'react';
import { BoxContent, Content } from '../styles';
import Modal from '@mui/material/Modal';
import { Grid, Typography, Button } from '@mui/material';

interface Props {
	open: boolean;
	message: string;
	title?: string | false;
	onClose?: () => void;
}

const ModalError: React.FC<Props> = ({
	open,
	message,
	title = 'Oops... something went wrong!',
	onClose,
}) => {
	const showTitle = title !== false;
	return (
		<Modal open={open} onClose={onClose}>
			<Content>
				<BoxContent>
					{showTitle && (
						<Typography sx={{ textAlign: 'center' }} variant="h5">
							{title}
						</Typography>
					)}
					<Typography variant="body1" sx={{ textAlign: 'center' }}>
						{message}
					</Typography>
				</BoxContent>
				<Grid container alignContent="center" justifyContent="center">
					<Button
						variant="contained"
						onClick={onClose}
						sx={{
							background: '#CE290C',
							'&:hover': {
								backgroundColor: '#de705c',
							},
						}}
					>
						Back
					</Button>
				</Grid>
			</Content>
		</Modal>
	);
};

export default ModalError;
