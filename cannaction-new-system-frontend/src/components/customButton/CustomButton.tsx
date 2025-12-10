// src/components/customButton/CustomButton.tsx
import React from 'react';
import { Button, CircularProgress } from '@mui/material';

interface CustomButtonProps {
	onClick?: () => void;
	type?: 'button' | 'submit' | 'reset';
	disabled?: boolean;
	showLoading?: boolean;
	children: React.ReactNode;
	size?: 'small' | 'medium' | 'large';
	backgroundColor?: string;
	color?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({
	onClick,
	type = 'button',
	disabled = false,
	showLoading = false,
	children,
	size = 'large',
	backgroundColor = '#1b7f75',
	color = '#fff',
}) => {
	return (
		<Button
			size={size}
			sx={{
				fontWeight: '600',
				textTransform: 'capitalize',
				width: '100%',
				// color: '#fff',
				color: color,
				borderRadius: '8px',
				// backgroundColor: '#1b7f75',
				backgroundColor: backgroundColor,
				borderColor: '#1b7f75',
				'&:hover': {
					backgroundColor: '#156155',
					borderColor: '#156155',
				},
			}}
			onClick={onClick}
			type={type}
			disabled={disabled}
			variant="contained"
		>
			{showLoading ? <CircularProgress size={24} color="inherit" /> : children}
		</Button>
	);
};

export default CustomButton;
