import { Button, Grid, Typography } from '@mui/material';
import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useRouteConfig } from '../../../../components/drawerMenu/dataListMenu';
import { FiUser } from '../../../../themes/icons';

interface Props {
	showHeader?: boolean;
}

export const LayoutAction: React.FC<Props> = ({ showHeader = true }) => {
	const location = useLocation();
	const navigate = useNavigate();
	const { title, icon } = useRouteConfig(location);

	return (
		<Grid container bgcolor={'#F2F6FC'}>
			{showHeader && (
				<Grid
					container
					justifyContent="space-around"
					alignItems="center"
					height={'60px'}
					bgcolor={'#F8F8F9'}
					boxShadow="0.15rem 0 1.75rem 0 rgba(33, 40, 50, 0.15)"
					borderBottom={'1px solid lightgray'}
					marginTop={'3.7rem'}
				>
					<Grid container alignItems="center" gap={2} width="80%">
						{icon}
						<Typography variant="h5">{title}</Typography>
					</Grid>
					{location.pathname === '/permissions' ? (
						<button
							className="btn btn-sm btn-light text-primary"
							style={{ display: 'flex', alignItems: 'center', gap: '5px' }}
						>
							<FiUser />
							Manage Users
						</button>
					) : (
						<Button
							variant="contained"
							sx={{ textTransform: 'capitalize', height: '30px' }}
							onClick={() => navigate(-1)}
						>
							Back
						</Button>
					)}
				</Grid>
			)}
			<Grid
				container
				pt={4}
				pb={4}
				pl={2.5}
				pr={2.5}
				justifyContent={'center'}
				height={'85vh'}
			>
				<Outlet />
			</Grid>
		</Grid>
	);
};
