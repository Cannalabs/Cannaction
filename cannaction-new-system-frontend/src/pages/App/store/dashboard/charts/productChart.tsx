import React from 'react';
import { FaExpand } from '../../../../../themes/icons';
import { Grid, Card, IconButton } from '@mui/material';
import {
	Bar,
	CartesianGrid,
	ComposedChart,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts';
import { MostSoldItemsList } from '../../../../../dtos/responses/StoreDashboardResponse';

interface Props {
	products: MostSoldItemsList[];
}

const truncateText = (text: string, maxLength: number) => {
	return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
};

export const ProductChart: React.FC<Props> = ({ products }) => {
	return (
		<Grid className="col-md-6 mb-4">
			<Card className="card card-header-actions">
				<div className="card-header">
					Product Charts
					<div className="dropdown no-caret">
						<IconButton className="btn btn-transparent-dark btn-icon">
							<FaExpand size={14} />
						</IconButton>
					</div>
				</div>

				<div className="card-body">
					{products.length > 0 ? (
						<ComposedChart
							layout="vertical"
							width={500}
							height={400}
							data={products}
							margin={{
								top: 20,
								right: 20,
								bottom: 20,
								left: 20,
							}}
						>
							<CartesianGrid stroke="#f5f5f5" />
							<XAxis type="number" allowDecimals={false} />
							<YAxis
								dataKey="name"
								type="category"
								scale="band"
								tickFormatter={(tick) => truncateText(tick, 10)}
							/>
							<Tooltip />
							<Bar dataKey="total" barSize={15} fill="#1b7f75" />
						</ComposedChart>
					) : (
						<div>No sales yet!</div>
					)}
				</div>
			</Card>
		</Grid>
	);
};
