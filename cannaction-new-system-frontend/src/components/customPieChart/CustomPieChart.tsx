// src\components\customPieChart\CustomPieChart.tsx
import React from 'react';
import {
	PieChart,
	Pie,
	Cell,
	ResponsiveContainer,
	Tooltip,
	Legend,
} from 'recharts';
import { Grid, Typography } from '@mui/material';

interface CustomPieChartProps {
	data: { name: string; value: number; color: string }[];
	title: string;
}

const CustomPieChart: React.FC<CustomPieChartProps> = ({ data, title }) => {
	if (!data || data.length === 0) {
		return (
			<Typography variant="body2" color="textSecondary" align="center">
				No data to show
			</Typography>
		);
	}

	return (
		<Grid container justifyContent="center">
			<Grid item xs={12} className="custom-pie-chart-content">
				<Typography variant="h6" color="rgb(228, 221, 247)" fontSize="1rem">
					{title}
				</Typography>
				<ResponsiveContainer width="100%" height={300}>
					<PieChart>
						<Pie
							data={data}
							dataKey="value"
							nameKey="name"
							cx="50%"
							cy="50%"
							outerRadius={80}
							label={false}
						>
							{data.map((entry, index) => (
								<Cell key={`cell-${index}`} fill={entry.color} />
							))}
						</Pie>
						<Tooltip />
						<Legend
							layout="horizontal"
							align="center"
							verticalAlign="bottom"
							formatter={(value) =>
								value.length > 15 ? `${value.substring(0, 15)}...` : value
							}
							wrapperStyle={{
								overflowY: 'auto',
								maxHeight: '100px',
								paddingTop: '20px',
							}}
						/>
					</PieChart>
				</ResponsiveContainer>
			</Grid>
		</Grid>
	);
};

export default CustomPieChart;
