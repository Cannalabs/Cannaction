import { Switch } from '@mui/material';
import { useTheme } from '@mui/system';
import React from 'react';

interface Props {
	title?: string;
	id?: string;
	value?: string;
}

export const SwitchComponent: React.FC<Props> = ({ title, value }) => {
	const theme = useTheme();
	const colorSwitch = theme.palette.secondary[200];

	return (
		<Switch
			title={title}
			edge="end"
			color="default"
			style={{ color: colorSwitch }}
			value={value}
		/>
	);
};
