import React, { Children, ReactNode } from 'react';
import { ListItem } from '@mui/material';
import { useTheme } from '@mui/system';

interface TableProps {
	children: ReactNode;
}

const Row: React.FC<TableProps> = ({ children }) => {
	const theme = useTheme();
	const borderColor = theme.palette.primary[200];

	const childrenWithProps = Children.map(children, (childRow) => {
		if (!React.isValidElement(childRow)) return childRow;
		if (!childRow?.props?.children) return childRow;

		const childrenLocal = Array.isArray(childRow.props.children)
			? childRow.props.children
			: [childRow.props.children];
		return React.cloneElement(childRow, ...childrenLocal);
	});

	return (
		<ListItem
			disablePadding
			sx={{
				display: 'flex',
				justifyContent: 'flex-start',
				height: '52px',
				borderBottom: `1px solid ${borderColor}`,
				'&:hover': {
					backgroundColor: theme.palette.action.hover,
					cursor: 'pointer',
				},
			}}
		>
			{childrenWithProps}
		</ListItem>
	);
};

export default Row;
