import React, { useEffect, useState, useCallback } from 'react';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { FormControl, styled } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/en';

interface DatePickerComponentProps {
	value?: string | null;
	onChange?: (value: string | null) => void;
	minDate?: string;
	maxDate?: string;
	disabled?: boolean;
	term?: string;
	hasTerm?: boolean;
	className?: string;
}

const StyledFormControl = styled(FormControl)(({ theme }) => ({
	width: '100%',
	'& .MuiOutlinedInput-root': {
		'&:hover .MuiOutlinedInput-notchedOutline': {
			borderColor: theme.palette.primary.main,
		},
	},
}));

const DATE_FORMAT = 'YYYY/MM/DD';

const DatePickerComponent: React.FC<DatePickerComponentProps> = ({
	value,
	onChange,
	minDate,
	maxDate,
	term,
	disabled,
	hasTerm,
	className,
}) => {
	const [cleared, setCleared] = useState<boolean>(false);

	useEffect(() => {
		if (cleared) {
			const timeout = setTimeout(() => {
				setCleared(false);
			}, 1500);

			return () => clearTimeout(timeout);
		}
		return undefined;
	}, [cleared]);

	const convertToDayjs = useCallback(
		(dateString: string | undefined | null): Dayjs | undefined => {
			if (!dateString) return undefined;
			const date = dayjs(dateString);
			return date.isValid() ? date : undefined;
		},
		[]
	);

	const handleChange = useCallback(
		(newValue: Dayjs | null) => {
			if (onChange) {
				onChange(newValue ? newValue.format(DATE_FORMAT) : null);
			}
		},
		[onChange]
	);

	const handleClear = useCallback(() => {
		setCleared(true);
		if (onChange) {
			onChange(null);
		}
	}, [onChange]);

	return (
		<LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en">
			<StyledFormControl fullWidth size="small" className={className}>
				<DatePicker
					value={convertToDayjs(value)}
					maxDate={convertToDayjs(maxDate)}
					disabled={disabled}
					minDate={convertToDayjs(minDate)}
					onChange={handleChange}
					closeOnSelect
					format={DATE_FORMAT}
					slotProps={{
						field: {
							clearable: true,
							onClear: handleClear,
						},
						textField: {
							helperText: hasTerm && term ? `Date ${term}` : undefined,
							error: false,
							fullWidth: true,
							size: 'small',
						},
					}}
				/>
			</StyledFormControl>
		</LocalizationProvider>
	);
};

export default DatePickerComponent;
