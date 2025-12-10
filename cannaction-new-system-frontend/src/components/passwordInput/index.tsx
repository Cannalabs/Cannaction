import React from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';
import { FormHelperText, InputLabel } from '@mui/material';

interface InputProps {
	error?: boolean;
	id?: string;
	value: string;
	onClick?: () => void;
	name: string;
	placeholder: string;
	label?: string;
	helperText?: boolean | string;
	size?: 'small' | 'medium';
	onChange:
		| React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
		| undefined;
}

const InputPassword = (props: InputProps) => {
	const {
		value,
		name,
		onChange,
		placeholder,
		label,
		helperText,
		size = 'small',
		...rest
	} = props;

	const [values, setValues] = React.useState({
		showPassword: false,
	});

	const handleClickShowPassword = () => {
		setValues({
			...values,
			showPassword: !values.showPassword,
		});
	};

	const handleMouseDownPassword = (event: React.MouseEvent) => {
		event.preventDefault();
	};

	return (
		<FormControl sx={{ width: '100%' }} variant="outlined">
			<InputLabel>{label}</InputLabel>
			<OutlinedInput
				size={size}
				id="outlined-adornment-password"
				type={values.showPassword ? 'text' : 'password'}
				value={value}
				name={name}
				placeholder={placeholder}
				label={label}
				endAdornment={
					<InputAdornment position="end">
						<IconButton
							aria-label="toggle password visibility"
							onClick={handleClickShowPassword}
							onMouseDown={handleMouseDownPassword}
							edge="end"
						>
							{values.showPassword ? <VisibilityOff /> : <Visibility />}
						</IconButton>
					</InputAdornment>
				}
				onChange={onChange}
				{...rest}
			/>
			{helperText && (
				<FormHelperText error id="outlined-adornment-password-error">
					{helperText}
				</FormHelperText>
			)}
		</FormControl>
	);
};

export default InputPassword;
