import React, { useState } from 'react';
import { FormControl, IconButton, TextField, Tooltip } from '@mui/material';
import { BsUpc } from 'react-icons/bs';
import { useTranslation } from 'react-i18next';
import { MoreInformationModal } from '../../../../components/modals/moreInformation';
import { ScanClubCardModalForLogin } from '../ScanClubCardModal/ScanClubCardForLoginModal';

interface InputProps {
	error?: boolean;
	helperText?: React.ReactNode;
	id?: string;
	value?: string | number;
	onClick?: () => void;
	name: string;
	placeholder?: string;
	label?: string;
	disabled?: boolean;
	isLogin?: boolean;
	type?: string;
	setFieldValue?: (f: string, v: string) => void;
	onChange?:
		| React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
		| undefined;
	size?: 'small' | 'medium';
}

export const InputLogin = (props: InputProps) => {
	const {
		value,
		name,
		onChange,
		placeholder,
		label,
		error,
		disabled,
		type = 'text',
		helperText,
		size = 'small',
		isLogin = false,
		setFieldValue,
	} = props;
	const [open, setOpen] = useState<boolean>(false);
	const { t } = useTranslation();
	return (
		<>
			<FormControl fullWidth sx={{ height: error ? '50px' : 'auto' }}>
				<TextField
					disabled={disabled}
					sx={{ width: isLogin ? '90%' : '100%' }}
					label={label}
					type={type}
					onChange={onChange}
					name={name}
					error={error}
					value={value}
					placeholder={placeholder}
					size={size}
					helperText={helperText}
				/>
				{isLogin && (
					<Tooltip
						placement="top"
						title={t('store.storeDashboard.scanCard')}
						className="text-muted"
					>
						<IconButton
							onClick={() => setOpen(true)}
							style={{
								position: 'absolute',
								right: 2,
								top: 0,
								color: 'green',
							}}
						>
							<BsUpc className="h-5 w-5" style={{ color: '#000000' }} />
						</IconButton>
					</Tooltip>
				)}
			</FormControl>
			<MoreInformationModal
				title={t('store.storeDashboard.scanCard')}
				open={open}
				hideSave
				handleClose={() => setOpen(false)}
			>
				<ScanClubCardModalForLogin setOpen={setOpen} setFieldValue={setFieldValue}/>
			</MoreInformationModal>
		</>
	);
};
