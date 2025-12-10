import React from 'react';
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from 'recharts';
import { Grid, Typography } from '@mui/material';

interface CustomBarChartProps {
	data: { name: string; value: number; color: string }[];
	title: string;
}

const CustomBarChart: React.FC<CustomBarChartProps> = ({ data, title }) => {
	if (!data || data.length === 0) {
		return (
			<Typography variant="body2" color="textSecondary" align="center">
				No Data to Show
			</Typography>
		);
	}

	return (
		<Grid item xs={12} sm={10} className="custom-bar-chart-content">
			<Typography variant="h6" color="black" fontSize="1rem">
				{title}
			</Typography>
			<ResponsiveContainer width="100%" height={300}>
				<BarChart
					data={data}
					margin={{ top: 5, right: 20, left: 50, bottom: 5 }}
					layout="vertical"
				>
					<CartesianGrid strokeDasharray="3 3" horizontal={false} />
					<XAxis
						type="number"
						allowDecimals={false}
						tickFormatter={(value) => value.toLocaleString()}
					/>
					<YAxis
						dataKey="name"
						type="category"
						width={100}
						tick={({ x, y, payload }) => (
							<text
								x={x}
								y={y}
								dy={4}
								textAnchor="end"
								fill="black"
								fontSize={11}
								style={{ fontFamily: 'Arial, sans-serif' }}
							>
								{payload.value.length > 15
									? `${payload.value.substring(0, 15)}...`
									: payload.value}
							</text>
						)}
					/>
					<Tooltip
						contentStyle={{
							backgroundColor: '#1a1a1a',
							border: '1px solid #333',
							borderRadius: '4px',
							color: '#E4DDF7',
						}}
					/>
					<Bar dataKey="value" fill="#1b7f75" radius={[0, 4, 4, 0]} />
				</BarChart>
			</ResponsiveContainer>
		</Grid>
	);
};

export default CustomBarChart;
