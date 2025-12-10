import CircularProgress from '@mui/material/CircularProgress';
import { motion } from 'framer-motion';
import styled from 'styled-components';

interface TableContainerProps {
	paddingBottom?: string;
}

interface TableRowProps {
	// isActive?: boolean;
	borderLeft?: string;
	borderRight?: string;
	cursor?: boolean;
}

export const TableContainer = styled(motion.div)<TableContainerProps>`
	width: 100%;
	padding: 0px 0px;
	padding-bottom: ${(props) => props.paddingBottom};
	height: auto;
	overflow: hidden;
`;

export const TableBody = styled.ul`
	padding-inline-start: 0px;
`;

export const TableRow = styled(motion.li)<TableRowProps>`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;

	justify-content: space-between;
	transition: var(--transition);
	border-bottom: 1px solid var(--aba);

	border-left: ${(props) => props.borderLeft};
	border-right: ${(props) => props.borderRight};

	&:hover {
		cursor: ${(props) => (props.cursor ? 'pointer' : 'default')};
		background-color: var(--gray1);
		color: var(--primary);
	}
`;

export const TableButtons = styled.div<TableRowProps>`
	display: flex;
	flex-direction: row;
	justify-content: flex-end;

	padding: 8px 8px;
	gap: 8px;
	width: 98%;
	height: 40px;
	border-radius: 4px;
`;

export const Button = styled.button`
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 6px 6px 6px 6px;

	margin-top: 10px;

	width: 154px;
	height: 44px;

	border: 1px solid var(--primary);
	border-radius: 8px;

	font-family: 'Raleway';
	font-style: normal;
	font-weight: 700;
	font-size: var(--font-size-sm);
	line-height: 20px;

	display: flex;
	align-items: center;
	text-align: center;

	color: var(--primary);
	cursor: pointer;

	&:hover {
		border: 1px solid var(--primary);
	}

	&:active {
		background: var(--primary);
		color: var(--white);
	}

	&:disabled {
		background: var(--gray3);
		color: var(--gray5);
		border: none;
	}
`;

export const LoadingProgress = styled(CircularProgress)`
	color: conic-gradient(
		from 180deg at 50% 50%,
		var(--primary) 0deg,
		rgba(196, 196, 196, 0) 360deg
	);
`;
