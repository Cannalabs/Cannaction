import { Box, IconButton, Modal as MuiModal } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import React, { useEffect, useRef } from 'react';

interface ModalProps {
	open: boolean;
	onClose: () => void;
	children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ open, onClose, children }) => {
	const contentRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (open && contentRef.current) {
			contentRef.current.scrollTop = 0;
		}
	}, [open]);

	return (
		<MuiModal
			open={open}
			onClose={onClose}
			aria-labelledby="modal-title"
			aria-describedby="modal-description"
			sx={{
				bgcolor: '#0a4f48',
			}}
		>
			<Box
				ref={contentRef}
				sx={{
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
					width: '90%',
					maxWidth: 800,
					maxHeight: '90vh',
					bgcolor: '#0a4f48',
					boxShadow: 24,
					p: 4,
					overflow: 'auto',
					borderRadius: 1,
					'&:focus': {
						outline: 'none',
					},
					'&::-webkit-scrollbar': {
						width: '8px',
					},
					'&::-webkit-scrollbar-track': {
						background: '#0a4f48',
						borderRadius: '4px',
					},
					'&::-webkit-scrollbar-thumb': {
						background: '#0D675E',
						borderRadius: '4px',
						'&:hover': {
							background: '#0b5951',
						},
					},
					scrollbarWidth: 'thin',
					scrollbarColor: '#0D675E #0a4f48',
				}}
			>
				<IconButton
					aria-label="close"
					onClick={onClose}
					sx={{
						position: 'sticky',
						float: 'right',
						top: 0,
						right: 0,
						color: (theme) => theme.palette.grey[500],
						backgroundColor: '#0a4f48',
						zIndex: 1,
						'&:hover': {
							color: (theme) => theme.palette.grey[800],
						},
					}}
				>
					<CloseIcon />
				</IconButton>
				{children}
			</Box>
		</MuiModal>
	);
};
