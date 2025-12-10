import React, { useState } from 'react';
import { DropDownCountries } from './DropDownCountries';

export const Promo: React.FC = () => {
	const [countryId, setCountryId] = useState<number | undefined>();

	return (
		<div className="col-xl-6 col-xxl-12 d-flex">
			<div className="card card-header-actions flex-fill mb-4">
				<div className="card-header">
					Item Rewards
					<DropDownCountries setCountryId={setCountryId} />
				</div>
				<div className="card-body">
					<div className="chart-pie">
						<div className="list-group list-group-flush">
							<div className="list-group-item d-flex align-items-center justify-content-between small px-0 py-0">
								<div>Canna White Hoodie</div>
								<div className="fw-500 text-dark">7.400 Points</div>
							</div>
							<div className="list-group-item d-flex align-items-center justify-content-between small px-0 py-0">
								<div>Biocanna Shopping Bag</div>
								<div className="fw-500 text-dark">3.200 Points</div>
							</div>
							<div className="list-group-item d-flex align-items-center justify-content-between small px-0 py-0">
								<div>Canna Coffee Machine</div>
								<div className="fw-500 text-dark">114.000 Points</div>
							</div>
							<div className="list-group-item d-flex align-items-center justify-content-between small px-0 py-0">
								<div>Canna White Hoodie</div>
								<div className="fw-500 text-dark">7.400 Points</div>
							</div>
							<div className="list-group-item d-flex align-items-center justify-content-between small px-0 py-0">
								<div>Biocanna Shopping Bag</div>
								<div className="fw-500 text-dark">3.200 Points</div>
							</div>
							<div className="list-group-item d-flex align-items-center justify-content-between small px-0 py-0">
								<div>Canna Coffee Machine</div>
								<div className="fw-500 text-dark">114.000 Points</div>
							</div>
							<div className="list-group-item d-flex align-items-center justify-content-between small px-0 py-0">
								<div>Canna Coffee Machine</div>
								<div className="fw-500 text-dark">114.000 Points</div>
							</div>
							<div className="list-group-item d-flex align-items-center justify-content-between small px-0 py-0">
								<div>Canna Coffee Machine</div>
								<div className="fw-500 text-dark">114.000 Points</div>
							</div>
							<div className="list-group-item d-flex align-items-center justify-content-between small px-0 py-0">
								<div>Canna Coffee Machine</div>
								<div className="fw-500 text-dark">114.000 Points</div>
							</div>
							<div className="list-group-item d-flex align-items-center justify-content-between small px-0 py-0">
								<div>Canna Coffee Machine</div>
								<div className="fw-500 text-dark">114.000 Points</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
