// src/components/customComboBox/CustomComboBox.tsx
import React from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { StyledPatterInput } from '../customSelect/styles';

interface CustomComboBoxProps {
	id: string;
	options: string[];
	label?: string;
	value?: string | null;
	onChange: (value: string | null) => void;
	fullWidth?: boolean;
}

const CustomComboBox: React.FC<CustomComboBoxProps> = ({
	id,
	options,
	label,
	value,
	onChange,
	fullWidth = false,
}) => {
	return (
		<Autocomplete
			disablePortal
			sx={StyledPatterInput}
			id={id}
			options={options}
			fullWidth={fullWidth}
			value={value}
			onChange={(event, newValue) => onChange(newValue)}
			renderInput={(params) => (
				<TextField
					{...params}
					label={label}
					fullWidth={fullWidth}
					variant="outlined"
				/>
			)}
		/>
	);
};

export default CustomComboBox;
