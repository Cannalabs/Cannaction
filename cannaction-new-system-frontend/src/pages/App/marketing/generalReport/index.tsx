import React from 'react';
import { Cards } from './Cards';
import { GrowthReport } from './Reports/GrowthReport';
import { StoreRanking } from './Reports/StoreRanking';
import { Products } from './Reports/Products';
import { Targets } from './Reports/Targets';
import { Promo } from './Reports/Promo';
// import { Generate } from './Generate';
import { DatePicker } from './DatePicker';

export const GeneralReport: React.FC = () => {
	return (
		<div className="container-xl px-4" style={{ marginTop: '5rem' }}>
			<div className="d-flex justify-content-between align-items-sm-center flex-column flex-sm-row mb-4">
				<div className="me-4 mb-3 mb-sm-0">
					<h1 className="mb-0">General Report</h1>
					<div className="small">
						<span className="fw-500 text-primary">Friday</span>· August 20, 2024 ·
						12:16 PM
					</div>
				</div>
				<DatePicker />
			</div>
			<div className="row">
				<div className="row">
					<Cards />
					<GrowthReport />
					<StoreRanking />
					<div className="row">
						<Products />
						<Targets />
					</div>
					<div className="row">
						<Promo />
						{/* <Generate /> */}
					</div>
				</div>
			</div>
		</div>
	);
};
