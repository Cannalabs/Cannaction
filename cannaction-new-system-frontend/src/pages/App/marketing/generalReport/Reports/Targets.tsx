import React, { useState } from 'react';
import {
	ResponsiveContainer,
	LineChart,
	Line,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts';
import { DropDownCountries } from './DropDownCountries';
import { useStoreTargetSuperUser } from '../../../../../hooks/querys/storeTarget/useStoreTargetUserSuper';
import { PrizeType } from '../../../../../models/enums/prizeType.enum';

export const Targets: React.FC = () => {
	const [countryId, setCountryId] = useState<number | undefined>();
	const { data } = useStoreTargetSuperUser({
		countryId,
		type: PrizeType.POINTS,
	});

	return (
		<div className="col-xl-6 col-xxl-12 d-flex">
			<div className="card card-header-actions flex-fill mb-4">
				<div className="card-header">
					Point Targets
					<DropDownCountries setCountryId={setCountryId} />
				</div>
				{data && data.length > 0 ? (
					<div className="card-body">
						<ResponsiveContainer width="100%" height={300}>
							<LineChart data={data}>
								<XAxis dataKey="month" />
								<YAxis dataKey="target" />
								<Tooltip />
								<Line
									type="monotone"
									dataKey="target"
									stroke="rgba(75, 192, 192, 1)"
									strokeWidth={3}
								/>
							</LineChart>
						</ResponsiveContainer>
					</div>
				) : (
					<div className="card-body">
					No Data Available.
					</div>
				)}
			</div>
		</div>
	);
};
