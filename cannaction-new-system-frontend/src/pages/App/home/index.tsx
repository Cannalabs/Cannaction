import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

import logo from '../../../assets/cannaction-logo.png';
import { Grid } from '@mui/material';

interface LogoProps {
	width: string;
	height: string;
}

const Logo = styled(motion.img)<LogoProps>`
	width: ${(props) => props.width};
	height: ${(props) => props.height};
`;

export const Home: React.FC = () => {
	return (
		<Grid
			height="82vh"
			gap={2}
			direction="column"
			container
			alignItems={'center'}
			justifyContent={'center'}
			alignContent={'center'}
		>
			<Logo
				initial={{ y: 10, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				exit={{ y: -10, opacity: 0 }}
				transition={{ duration: 0.2 }}
				width="157px"
				height="27px"
				src={logo}
				alt="logoNome"
			/>
		</Grid>
	);
};
