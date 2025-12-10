/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Drawer, Divider, List, Grid } from '@mui/material';
import { useMenu } from '../../hooks/store/useMenuStore';
import './styles.css';
import { ListItemComponent } from './listItem';
import { useDataListMenu, useRouteConfig } from './dataListMenu';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/Auth';
import { useUser } from '../../hooks/querys/user/useUser';

export const DrawerMenu: React.FC = () => {
	const [selectedMenu, setSelectedMenu] = useState<string>('');
	const { isMenuExpanded, handleDrawerClose } = useMenu();
	const navigate = useNavigate();
	const location = useLocation();
	const { userTypeLogged, userLoggedId } = useAuth();

	const { data: user } = useUser(Number(userLoggedId));

	const handleMenuSelect = (menuName: string) => {
		setSelectedMenu(menuName);
	};

	const { title } = useRouteConfig(location);

	const handleNavigate = (url: string) => {
		navigate(url);
		handleMenuSelect(title);
		handleDrawerClose();
	};

	useEffect(() => {
		handleMenuSelect(title);
	}, [title]);

	const menuOptions = useDataListMenu(userTypeLogged);

	return (
		<Drawer
			sx={{
				width: 250,
				flexShrink: 0,
				'& .MuiDrawer-paper': {
					width: 250,
					boxSizing: 'border-box',
					top: '57px',
					height: '94vh',
					justifyContent: 'space-between',
					boxShadow: '0.15rem 0 1.75rem 0 rgba(33, 40, 50, 0.15)',
				},
			}}
			variant="persistent"
			anchor="left"
			open={isMenuExpanded}
			onClose={handleDrawerClose}
		>
			<Divider />

			<Grid
				sx={{
					height: '94vh',
					overflowY: 'auto',
					'&::-webkit-scrollbar': { width: '6px' },
					'&::-webkit-scrollbar-thumb': {
						backgroundColor: 'lightgray',
						borderRadius: '3px',
					},
				}}
			>
				<List>
					{menuOptions.map((item) => (
						<ListItemComponent
							key={item.label}
							onClick={() => handleNavigate(item.url)}
							label={item.label}
							icon={item.icon}
							selected={item.label === title}
						/>
					))}
					{/* {userCustomer && (
					<ListItemComponent
						onClick={() => handleOpenContactUs()}
						label="Contact Us"
						icon={<FiMessageSquare />}
						selected={false}
					/>
				)}  */}
				</List>
			</Grid>
			{userTypeLogged && ['customer'].includes(userTypeLogged) && (
				<div
					className="sidenav-footer"
					style={{
						padding: '1rem',
						background: '#F4F4F5',
					}}
				>
					<div className="sidenav-footer-content">
						<div
							className="sidenav-footer-subtitle"
							style={{
								fontSize: '20px',
							}}
						>
							Your Points
						</div>
						<div className="sidenav-footer-title text-primary">{user?.points}</div>
					</div>
				</div>
			)}
		</Drawer>
	);
};
