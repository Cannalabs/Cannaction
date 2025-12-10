import React from 'react';
import FormControl from '@mui/material/FormControl';
import {
	FormHelperText,
	InputLabel,
	MenuItem,
	Select,
	SelectChangeEvent,
} from '@mui/material';

interface ValueList {
	id?: number;
	name: string;
}

interface SelectProps {
	error?: boolean;
	id?: string;
	value?: number | string;
	onClick?: () => void;
	name: string;
	label?: string;
	inputLabel?: string;
	onChange: (e: SelectChangeEvent<string>) => void;
	placeholder?: string;
	valueList?: ValueList[];
	labelId: string;
	// children: ReactNode;
	disabled?: boolean;
	helperText?: React.ReactNode;
}

export const SelectLogin: React.FC<SelectProps> = ({
	value,
	name,
	onChange,
	label,
	id,
	inputLabel,
	placeholder,
	labelId,
	disabled,
	helperText,
	error,
	valueList,
}) => {
	return (
		<FormControl fullWidth sx={{ height: error ? '50px' : 'auto' }}>
			<InputLabel id={labelId} style={{ fontSize: '0.8rem' }}>
				{inputLabel}
			</InputLabel>
			<Select
				size="small"
				labelId={labelId}
				id={id}
				disabled={disabled}
				label={label}
				value={value?.toString()}
				name={name}
				onChange={onChange}
				placeholder={placeholder}
			>
				{Array.isArray(valueList) &&
					valueList.map((item) => (
						<MenuItem key={item.id} value={item.id} style={{ fontSize: '0.8rem' }}>
							{item.name}
						</MenuItem>
					))}
			</Select>
			{helperText && <FormHelperText error={error}>{helperText}</FormHelperText>}
		</FormControl>
	);
};
