import { motion } from 'framer-motion';
import { Outlet } from 'react-router-dom';
import { Navigate } from '../../../components/navigate';
import { styled, useMediaQuery, useTheme } from '@mui/material';
import { useMenu } from '../../../hooks/store/useMenuStore';

export const LayoutApp: React.FC = () => {
	const { isMenuExpanded, drawerWidth } = useMenu();
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

	const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
		open?: boolean;
	}>(({ theme, open }) => ({
		flexGrow: 1,
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		...(open && {
			width: `calc(100% - ${drawerWidth}px)`,
			marginLeft: `${drawerWidth}px`,
			transition: theme.transitions.create('margin', {
				easing: theme.transitions.easing.easeOut,
				duration: theme.transitions.duration.enteringScreen,
			}),
		}),
		minHeight: '100vh',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
	}));

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			className="nav-fixed"
		>
			<Navigate />
			{!isMobile ? (
				<Main open={isMenuExpanded}>
					<Outlet />
				</Main>
			) : (
				<Outlet />
			)}
		</motion.div>
	);
};
