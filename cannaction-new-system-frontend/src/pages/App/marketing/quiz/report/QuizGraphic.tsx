import { Grid } from '@mui/material';
import React from 'react';
import CustomGrid from '../../../../../components/cards/customGrid/CustomGrid';
import CustomPieChart from '../../../../../components/customPieChart/CustomPieChart';

export const QuizGraphic: React.FC = () => {
	return (
		<Grid item xs={12} sm={5.8} columns={{ xs: 2, sm: 8, md: 12 }}>
			<CustomGrid title="Quiz Graphic">
				<CustomPieChart data={[]} title="" />
			</CustomGrid>
		</Grid>
	);
};
