import React from 'react';
import img from '../../../../assets/img/illustrations/data-report.svg';

export const Generate: React.FC = () => {
	return (
		<div className="card card-waves mb-4">
			<div className="card-body p-5">
				<div className="row align-items-center justify-content-between">
					<div className="col">
						<h2 className="text-primary">Report Generation</h2>
						<p className="text-gray-700">
							Generate a PDF with the data displayed in this panel!
						</p>
						<button className="btn btn-primary p-3">Generate Now</button>
					</div>
					<div className="col d-none d-lg-block mt-xxl-n4">
						<img className="img-fluid px-xl-4 mt-xxl-n5" src={img} />
					</div>
				</div>
			</div>
		</div>
	);
};
