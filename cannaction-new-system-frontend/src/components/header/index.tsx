import React, { ReactNode } from 'react';

interface HeaderProps {
	title: string;
	subtitle: string;
	icon: ReactNode;
}

export const Header: React.FC<HeaderProps> = ({ title, subtitle, icon }) => {
	return (
		<div className="container-xl px-4">
			<div className="page-header-content pt-4" style={{ marginTop: '3rem' }}>
				<div className="row align-items-center justify-content-between">
					<div className="col-auto mt-4">
						<h1 className="page-header-title">
							<div className="page-header-icon">{icon}</div>
							{title}
						</h1>
						<div className="page-header-subtitle">{subtitle}</div>
					</div>
				</div>
			</div>
		</div>
	);
};
