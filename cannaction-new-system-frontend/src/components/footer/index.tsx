import React from 'react';
import { getCurrentYear } from '../../utils/string';

export const Footer: React.FC = () => {
	const year = getCurrentYear();

	return (
		<footer className="footer-admin mt-auto footer-light">
			<div className="container-xl px-4">
				<div className="row">
					<div className="col-md-6 small">Copyright ©{year} | Cannaction</div>
				</div>
			</div>
		</footer>
	);
};
