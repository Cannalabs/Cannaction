
import React, { useState } from 'react';
// { useEffect, useState } 
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
// import { useSalesSuperUser } from '../../../../../hooks/querys/sale/useSalesSuperUser';
const data = [
	{
		name: 'Product A',
		Growth: 4000,
	},
	{
		name: 'Product B',
		Growth: 3000,
	},
	{
		name: 'Product C',
		Growth: 2000,
	},
	{
		name: 'Product D',
		Growth: 2780,
	},
	{
		name: 'Product E',
		Growth: 1890,
	},
];

export const Products: React.FC = () => {
	const [countryId, setCountryId] = useState<number | undefined>();
	// const {data, isRefetching, isLoading, refetch} = useSalesSuperUser();
	
	// useEffect(() => {
	// 	refetch();
	// // eslint-disable-next-line react-hooks/exhaustive-deps
	// }, []);

	return (
		<div className="col-xl-6 col-xxl-12 d-flex">
			<div className="card card-header-actions flex-fill mb-4">
				<div className="card-header">
					Products
					<DropDownCountries setCountryId={setCountryId} />
				</div>
				<div className="card-body">
					<ResponsiveContainer width="100%" height={300}>
						<BarChart
							data={data}
							margin={{ top: 20, right: 30, bottom: 5 }}
							layout="vertical"
						>
							<CartesianGrid strokeDasharray="3 3" />
							<YAxis type="category" dataKey="name" width={120} />
							<XAxis type="number" />
							<Tooltip />
							<Bar dataKey="Growth" fill="#1b7f75" />
						</BarChart>
					</ResponsiveContainer>
				</div>
			</div>
		</div>
	);
};
