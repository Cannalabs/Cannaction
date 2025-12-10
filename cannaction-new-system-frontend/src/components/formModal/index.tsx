import CloseIcon from '@mui/icons-material/Close';
import { Button, Grid, IconButton, Typography } from '@mui/material';
import Modal from '@mui/material/Modal';
import { Box, useTheme } from '@mui/system';
import React from 'react';
import UserEntity from '../../models/entities/UserEntity';
import { useTranslation } from 'react-i18next';

export type FormModalProps = {
	title: string;
	open: boolean;
	handleClose: () => void;
	children?: React.ReactNode;
	setCard?: (card: UserEntity | undefined) => void;
	card?: UserEntity;
	handleSubmit: () => void;
	loading: boolean;
};

const FormModal = ({
	title,
	open,
	handleClose,
	children,
	setCard,
	handleSubmit,
	loading,
}: FormModalProps) => {
	const theme = useTheme();
	const { t } = useTranslation();

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
			<Box
				sx={{
					position: 'absolute' as const,
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
					width: 500,
					boxShadow: 24,
					height:
						title === t('marketing.clubCard.actionsColumnEditTooltip') ||
						title === t('marketing.clubCard.cardsTableAddButtonTooltip')
							? 450
							: 210,
					borderRadius: 2,
					backgroundColor: '#fff',
				}}
			>
				<Grid
					container
					sx={{
						borderBottom: '1px solid lightgray',
						p: 2,
					}}
				>
					<IconButton
						onClick={() => {
							setCard && setCard(undefined);
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
				<Grid container justifyContent={'flex-end'} mt={2} p={2} gap={2}>
					<Button disabled={loading} variant="outlined" onClick={handleClose}>
						Close
					</Button>
					<Button disabled={loading} variant="contained" onClick={handleSubmit}>
						Save
					</Button>
				</Grid>
			</Box>
		</Modal>
	);
};

export default FormModal;
