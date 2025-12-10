import { Grid } from '@mui/material';
import React from 'react';
import Cannaction from '../../../components/cannaction/Cannaction';
import { Outlet } from 'react-router-dom';
import './Login.styles.css';

export const LayoutLogin: React.FC = () => {
	// const navigate = useNavigate();
	// const { signed } = useAuth();

	// useEffect(() => {
	// 	if (signed) {
	// 		const url = localStorage.getItem('currentRoute');
	// 		if (typeof url !== 'undefined' && url !== null) {
	// 			localStorage.removeItem('currentRoute');
	// 			navigate(url);
	// 		} else {
	// 			navigate('/dashboard');
	// 		}
	// 	}
	// }, [navigate, signed]);
	return (
		<Grid container height={'100vh'}>
			<Cannaction />
			<Outlet />
		</Grid>
	);
};
