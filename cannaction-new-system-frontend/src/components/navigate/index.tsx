import React, { useEffect, useState } from 'react';
import Logo from '../../assets/cannaction-logo.png';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useMenu } from '../../hooks/store/useMenuStore';
import { Profile } from '../profile';
import { DrawerMenu } from '../drawerMenu';
import { useNavigate } from 'react-router-dom';
import feather from 'feather-icons';
import { useAuth } from '../../contexts/Auth';
import { useUser } from '../../hooks/querys/user/useUser';
import { UserTypeEnum } from '../../models/enums/userType.enum';
import { useTranslation } from 'react-i18next';

export const Navigate: React.FC = () => {
	const navigate = useNavigate();
	const { userLoggedId } = useAuth();
	const { data: user } = useUser(Number(userLoggedId));
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);
	const { t } = useTranslation();

	const { isMenuExpanded, handleDrawerClose, handleDrawerOpen } = useMenu();

	useEffect(() => {
		const handleResize = () => {
			setWindowWidth(window.innerWidth);
		};

		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	const toggleSidenav = () => {
		if (isMenuExpanded) {
			handleDrawerClose();
		} else {
			handleDrawerOpen();
		}
	};

	useEffect(() => {
		feather.replace();
	}, []);

	const handleClickLogo = () => {
		navigate('/dashboard');
		handleDrawerClose();
	};

	const truncateText = (text: string, maxLength: number) => {
		return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
	};

	const getUserDisplayText = () => {
		const fullName = `${
			user?.name
				? `${user?.name} ${user?.lastName}`
				: `${t('store.routes.clubCard.title')} ${user?.code}`
		}`;
		let nameMaxLength = 30;
		let storeMaxLength = 40;

		// Ajusta o comprimento máximo baseado no tamanho da tela
		if (windowWidth <= 768) {
			// Telas médias
			nameMaxLength = 20;
			storeMaxLength = 15;
		}
		if (windowWidth <= 576) {
			// Telas pequenas
			nameMaxLength = 15;
			storeMaxLength = 10;
		}

		const truncatedName = truncateText(fullName, nameMaxLength);

		if (
			user?.userType !== UserTypeEnum.MARKETING &&
			user?.userType !== UserTypeEnum.SUPER
		) {
			const storeInfo = `${t('marketing.dashboard.storeTargets.store')}: ${
				user?.store?.name
			}`;
			const truncatedStore = truncateText(storeInfo, storeMaxLength);
			return `${truncatedName} - ${truncatedStore}`;
		}
		return truncatedName;
	};

	return (
		<>
			<nav className="topnav navbar navbar-expand shadow justify-content-between justify-content-sm-start navbar-light bg-white">
				<button
					className="navbar-brand"
					style={{ border: 'none', background: 'none' }}
					onClick={() => handleClickLogo()}
				>
					<img
						src={Logo}
						alt=""
						className="logo"
						style={{ maxWidth: '150px', height: 'auto' }}
					/>
				</button>
				<button
					className="btn btn-icon btn-transparent-dark order-1 order-lg-0 me-2 ms-lg-5 me-lg-0"
					id="sidebarToggle"
				>
					{isMenuExpanded ? (
						<CloseIcon onClick={handleDrawerClose} />
					) : (
						<MenuIcon onClick={() => toggleSidenav()} />
					)}
				</button>
				<ul className="navbar-nav align-items-center ms-auto">
					<div
						style={{
							marginRight: '20px',
							maxWidth:
								windowWidth <= 576 ? '120px' : windowWidth <= 768 ? '200px' : '300px',
							overflow: 'hidden',
							textOverflow: 'ellipsis',
							whiteSpace: 'nowrap',
							fontSize: windowWidth <= 576 ? '12px' : '14px',
						}}
					>
						{getUserDisplayText()}
					</div>
					<Profile />
				</ul>
			</nav>
			<DrawerMenu />
		</>
	);
};
