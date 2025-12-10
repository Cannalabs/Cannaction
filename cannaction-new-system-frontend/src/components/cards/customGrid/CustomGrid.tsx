import React, { ReactNode } from 'react';
import { Grid, Typography } from '@mui/material';
import './CustomGrid.styles.css';

interface CustomGridProps {
	title: string;
	subtitle?: string;
	children: ReactNode;
	backgroundColor?: string;
	color?: string;
	showSubtitle?: boolean;
}

const CustomGrid: React.FC<CustomGridProps> = ({
	title,
	subtitle,
	children,
	backgroundColor = '#F1F5FB',
	color = '#1b7f75',
	showSubtitle = true,
}) => {
	return (
		<Grid width={'100%'} justifyContent="space-between">
			<Grid className="custom-grid-central-content">
				<Grid
					p="1rem"
					container
					alignItems="center"
					justifyContent="flex-start"
					sx={{ backgroundColor: backgroundColor }}
					borderBottom="1px solid lightgray"
					borderRadius="0.35rem"
				>
					<Typography variant="h1" color={color} fontSize="1.1rem">
						{title}
					</Typography>
				</Grid>

				<Grid
					container
					alignItems="center"
					justifyContent="center"
					bgcolor={'#fff'}
				>
					{children}
				</Grid>

				{showSubtitle && (
					<Grid
						p="1rem"
						container
						alignItems="center"
						justifyContent="flex-start"
						sx={{ backgroundColor: backgroundColor }}
						borderTop="1px solid lightgray"
						borderRadius="0.35rem"
					>
						<Typography variant="h6" fontSize="1rem">
							{subtitle}
						</Typography>
					</Grid>
				)}
			</Grid>
		</Grid>
	);
};

export default CustomGrid;
