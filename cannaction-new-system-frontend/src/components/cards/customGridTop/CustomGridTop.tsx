// src\components\cards\customGrid\CustomGrid.tsx

import React, { ReactNode } from 'react';
import { Grid, Typography, Paper } from '@mui/material';
import './CustomGridTop.styles.css';

interface CustomGridProps {
	icon: ReactNode;
	title: string;
	subtitle: string;
	imageSrc: string;
}

const CustomGrid: React.FC<CustomGridProps> = ({
	icon,
	title,
	subtitle,
	imageSrc,
}) => {
	return (
		<Grid className="custom-grid-header" item xs={4.5} md={3.8}>
			<Paper elevation={3} className="hover-card">
				<Grid>
					<Grid>{icon}</Grid>
					<Typography variant="h6" fontSize="1rem">
						{title}
					</Typography>
					<Typography color="#a7aeb8" variant="subtitle1" fontSize="0.875em">
						{subtitle}
					</Typography>
				</Grid>
				<Grid>
					<img src={imageSrc} alt={title} style={{ width: '6rem' }} />
				</Grid>
			</Paper>
		</Grid>
	);
};

export default CustomGrid;
