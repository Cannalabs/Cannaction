import React from 'react';
import { Grid } from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { DropDownActions } from './DropDownActions';

const data = [
	{ name: 'Store A', value: 400 },
	{ name: 'Store B', value: 300 },
	{ name: 'Store C', value: 300 },
	{ name: 'Store D', value: 200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export const StoreRanking: React.FC = () => {
	return (
		<div className="col-xl-4 col-xxl-12">
			<div className="card card-header-actions mb-4">
				<div className="card-header">
					Store Ranking
					<DropDownActions />
				</div>
				<Grid container justifyContent="center">
					<Grid item xs={12} className="custom-pie-chart-content">
						<ResponsiveContainer width="100%" height={340}>
							<PieChart>
								<Pie
									data={data}
									cx="50%"
									cy="50%"
									innerRadius={60}
									outerRadius={80}
									paddingAngle={5}
									dataKey="value"
								>
									{data.map((entry, index) => (
										<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
									))}
								</Pie>
								<Tooltip />
							</PieChart>
						</ResponsiveContainer>
					</Grid>
				</Grid>
			</div>
		</div>
	);
};
