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
import { DropDownCountries } from './DropDownCountries';

const data = [
	{
		name: 'Jan',
		Growth: 4000,
	},
	{
		name: 'Feb',
		Growth: 3000,
	},
	{
		name: 'Mar',
		Growth: 2000,
	},
	{
		name: 'Apr',
		Growth: 2780,
	},
	{
		name: 'Jun',
		Growth: 1890,
	},
	{
		name: 'Jul',
		Growth: 2390,
	},
	{
		name: 'Aug',
		Growth: 3490,
	},
	{
		name: 'Sep',
		Growth: 3490,
	},
	{
		name: 'Oct',
		Growth: 3490,
	},
	{
		name: 'Nov',
		Growth: 3490,
	},
	{
		name: 'Dec',
		Growth: 3490,
	},
];

export const GrowthReport: React.FC = () => {
	return (
		<div className="col-xl-8">
			<div className="card card-header-actions mb-4">
				<div className="card-header">
					Growth Measurement
					<DropDownCountries />
				</div>
				<div className="card-body">
					<ResponsiveContainer width="100%" height={300}>
						<BarChart
							height={300}
							data={data}
							margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
						>
							<CartesianGrid strokeDasharray="3 3" />
							<XAxis dataKey="name" />
							<YAxis />
							<Tooltip />

							<Bar dataKey="Growth" fill="#1b7f75" />
						</BarChart>
					</ResponsiveContainer>
				</div>
			</div>
		</div>
	);
};
