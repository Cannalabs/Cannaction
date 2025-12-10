import {
	FormControl,
	Grid,
	IconButton,
	InputAdornment,
	InputLabel,
	OutlinedInput,
	TextField,
} from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import UserEntity from '../../../../../../models/entities/UserEntity';
import DatePickerComponent from '../../../../../../components/datePickerComponent/DatePickerComponent';
import { useTranslation } from 'react-i18next';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const style = {
	'& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
		border: 'none',
		transition: 'background 0.3s ease',
	},
	background: '#f2f6fc',
	borderRadius: '8px',
};

interface Props {
	card?: UserEntity | undefined;
	code?: string;
	setCode?: (code: string) => void;
	date?: string;
	storeId?: number | undefined;
	setStoreId?: (storeId: number) => void;
	name?: string;
	setName?: (n: string) => void;
	lastName?: string;
	setLastName?: (n: string) => void;
	email?: string;
	setEmail?: (n: string) => void;
	birthdate?: string;
	setBirthdate?: (n: string) => void;
	storeCountry?: number;
	password?: string;
	setPassword?: (p: string) => void;
}

export const CardForm: React.FC<Props> = ({
	card,
	code,
	setCode,
	date,
	name,
	setName,
	lastName,
	setLastName,
	birthdate,
	setBirthdate,
	email,
	setEmail,
	password,
	setPassword,
}) => {
	const inputRef = useRef<HTMLInputElement>(null);
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const { t } = useTranslation();

	useEffect(() => {
		inputRef.current?.focus();
	}, []);

	const handlePassword = () => {
		setShowPassword(!showPassword);
	};

	const handleMouseDownPassword = (event: React.MouseEvent) => {
		event.preventDefault();
	};

	return (
		<Grid
			container
			p={2}
			justifyContent={'space-between'}
			gap={2}
			borderBottom="1px solid lightgray"
		>
			<Grid item xs={5.5}>
				<TextField
					sx={style}
					fullWidth
					inputRef={inputRef}
					disabled={card?.id ? true : false}
					label={t('marketing.storesSetting.customersTableCodeColumn')}
					onChange={(e) => setCode && setCode(e.target.value)}
					size="small"
					placeholder="Card Id"
					value={code}
				/>
			</Grid>
			<Grid item xs={5.5}>
				<TextField
					sx={style}
					fullWidth
					label={t('marketing.addCard.dateInput')}
					size="small"
					value={date}
					disabled
				/>
			</Grid>
			<Grid item xs={5.5}>
				<TextField
					sx={style}
					fullWidth
					label={t('marketing.addPromotion.nameInput')}
					onChange={(e) => setName && setName(e.target.value)}
					size="small"
					placeholder="Name"
					value={name}
				/>
			</Grid>
			<Grid item xs={5.5}>
				<TextField
					sx={style}
					fullWidth
					label={t('marketing.addUser.lastName')}
					onChange={(e) => setLastName && setLastName(e.target.value)}
					size="small"
					placeholder={t('marketing.addUser.lastName')}
					value={lastName}
				/>
			</Grid>
			<Grid item xs={5.5}>
				<TextField
					sx={style}
					fullWidth
					label={t('marketing.addUser.emailInput')}
					onChange={(e) => setEmail && setEmail(e.target.value)}
					size="small"
					placeholder={t('marketing.addUser.emailInput')}
					value={email}
				/>
			</Grid>
			<Grid item xs={5.5}>
				<DatePickerComponent
					onChange={(value: string | null) => {
						if (!value) {
							setBirthdate && setBirthdate('');
							return;
						}
						setBirthdate && setBirthdate(value);
					}}
					value={birthdate}
					term={t('marketing.profilePunctuation.birthdateBoxTitle')}
				/>
			</Grid>
			<Grid item xs={5.5}>
				<FormControl sx={{ width: '100%' }} variant="outlined">
					<InputLabel>{`${
						card?.id
							? t('marketing.addUser.updateUser')
							: t('marketing.addUser.createUser')
					} ${t('marketing.addUser.password')}`}</InputLabel>
					<OutlinedInput
						size={'small'}
						id="outlined-adornment-password"
						type={showPassword ? 'text' : 'password'}
						value={password}
						placeholder={t('marketing.addUser.password')}
						label={`${
							card?.id
								? t('marketing.addUser.updateUser')
								: t('marketing.addUser.createUser')
						} ${t('marketing.addUser.password')}`}
						endAdornment={
							<InputAdornment position="end">
								<IconButton
									aria-label="toggle password visibility"
									onClick={handlePassword}
									onMouseDown={handleMouseDownPassword}
									edge="end"
								>
									{showPassword ? <VisibilityOff /> : <Visibility />}
								</IconButton>
							</InputAdornment>
						}
						onChange={(e) => {
							setPassword && setPassword(e.target.value);
						}}
					/>
				</FormControl>
			</Grid>
		</Grid>
	);
};
