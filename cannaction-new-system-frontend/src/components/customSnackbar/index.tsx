import CloseIcon from '@mui/icons-material/Close';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import React from 'react';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>((props, ref) => {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface CustomSnackbarProps {
	open: boolean;
	handleClose: () => void;
	message: string;
	severity: 'success' | 'error';
}

const CustomSnackbar: React.FC<CustomSnackbarProps> = ({
	open,
	handleClose,
	message,
	severity,
}) => {
	return (
		<Snackbar
			open={open}
			autoHideDuration={5000}
			onClose={handleClose}
			anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
			sx={{ pt: 2 }}
		>
			<Alert
				severity={severity}
				sx={{
					width: '100%',
					color: [severity === 'success' ? '#fff' : 'error'],
					backgroundColor: [severity === 'success' ? '#0D675E' : 'error'],
					fontSize: '1rem',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					'& .MuiAlert-icon': {
						color: [severity === 'success' ? '#fff' : 'error'],
					},
				}}
				onClose={handleClose}
				action={
					<IconButton
						size="small"
						aria-label="close"
						onClick={handleClose}
						sx={{
							color: [severity === 'success' ? '#fff' : 'error'],
							fontSize: '1.25em',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							paddingLeft: 2,
						}}
					>
						<CloseIcon fontSize="inherit" />
					</IconButton>
				}
			>
				{message}
			</Alert>
		</Snackbar>
	);
};

export default CustomSnackbar;
