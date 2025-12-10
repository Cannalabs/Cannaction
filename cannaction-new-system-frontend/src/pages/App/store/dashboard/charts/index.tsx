import React from 'react';
import { ProductChart } from './productChart';
import ScoreChart from './scoreChart';
import { MostSoldItemsList } from '../../../../../dtos/responses/StoreDashboardResponse';

interface Props {
	products: MostSoldItemsList[];
	sales: number;
}

export const ChartsSection: React.FC<Props> = ({products, sales}) => {
	return (
		<div className="row">
			<ProductChart products={products} />
			{/* <ScoreChart sales={sales}/> */}
		</div>
	);
};
