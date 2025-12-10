import React from 'react';
import { Header } from '../../../../components/header';
import { Outlet, useLocation } from 'react-router-dom';
import { useRouteConfig } from '../../../../components/drawerMenu/dataListMenu';

export const RootLayout: React.FC = () => {
	const location = useLocation();

	const { title, subtitle, icon } = useRouteConfig(location);

	return (
		<main>
			<header className="page-header page-header-dark bg-gradient-primary-to-secondary pb-10">
				<Header title={title} subtitle={subtitle} icon={icon} />
			</header>
			<Outlet />
		</main>
	);
};
