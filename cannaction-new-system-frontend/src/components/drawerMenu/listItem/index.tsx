import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import React, { ReactNode } from 'react';

interface ListItemProps {
	onClick: () => void;
	icon: ReactNode;
	label: string;
	selected: boolean;
}

export const ListItemComponent: React.FC<ListItemProps> = ({
	icon,
	label,
	onClick,
	selected,
}) => {
	return (
		<ListItemButton onClick={onClick} sx={{ color: selected ? '#1b7f75' : '' }}>
			<ListItemIcon
				style={{
					fontSize: 20,
					color: selected ? '#1b7f75' : '#B2B8C1',
				}}
			>
				{icon}
			</ListItemIcon>
			<ListItemText
				sx={{
					display: 'flex',
					alignItems: 'center',
					justifyItems: 'center',
				}}
			>
				<span style={{ fontWeight: selected ? '600' : '400' }}>{label}</span>
			</ListItemText>
		</ListItemButton>
	);
};
