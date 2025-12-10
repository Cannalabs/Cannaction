import { Grid } from '@mui/material';
import { motion } from 'framer-motion';
import React from 'react';
import { QuizTable } from './QuizTable';
import { QuizGraphic } from './QuizGraphic';

export const QuizReport: React.FC = () => {
	return (
		<motion.form
			initial={{ y: 10, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			exit={{ y: -10, opacity: 0 }}
			transition={{ duration: 0.2 }}
			style={{ width: '100%' }}
		>
			<Grid container justifyContent={'space-between'}>
				<QuizTable />
				<QuizGraphic />
			</Grid>
		</motion.form>
	);
};
