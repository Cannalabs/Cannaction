import React, { useEffect, useRef, useState } from 'react';
import {
	Divider,
	Grid,
	IconButton,
	InputAdornment,
	TextField,
} from '@mui/material';
import { BsUpc } from 'react-icons/bs';
import { MdOutlineSearch } from 'react-icons/md';
import { useSnackbar } from '../../../../contexts/Snackbar';
import UserService from '../../../../services/UserService';
import { useTranslation } from 'react-i18next';

interface Props {
	setOpen: (o: boolean) => void;
	setFieldValue?: (f: string, v: string) => void;
}

export const ScanClubCardModalForLogin: React.FC<Props> = ({
	setOpen,
	setFieldValue,
}) => {
	const [barcode, setBarcode] = useState<string>('');
	const { openSnackbar } = useSnackbar();
	const inputRef = useRef<HTMLInputElement>(null);
	const { t } = useTranslation();

	useEffect(() => {
		inputRef.current?.focus();
	}, []);

	const findUserByClubCardCode = async () => {
		try {
			const user = await UserService.getClubCardUserForLogin(barcode);
			if (user == null) {
				openSnackbar(t('store.storeDashboard.cardNotFound'), 'error');
                return;                
			}
            if (user == undefined || user == '') {
                openSnackbar(t('general.clubCardNoPassword'), 'error');
                return; 
            }
             openSnackbar(t('general.clubCardUserFound'), 'success');
            setFieldValue && setFieldValue('emailOrNickname', user);
            setOpen(false);
		} catch (e) {
			openSnackbar(e, 'error');
		}
	};

	return (
		<>
			<Grid
				container
				p={2}
				justifyContent="space-between"
				gap={2}
				sx={{ marginTop: '50px' }}
			>
				<TextField
					fullWidth
					inputRef={inputRef}
					autoFocus
					variant="outlined"
					onKeyDown={(event) => {
						if (event.key === 'Enter') {
							event.preventDefault();
							findUserByClubCardCode();
						}
					}}
					value={barcode}
					onChange={(e) => {
						setBarcode(e.target.value);
					}}
					placeholder={t('store.storeDashboard.scanClubCard')}
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								<BsUpc className="h-5 w-5" style={{ color: '#1b7f75' }} />
							</InputAdornment>
						),
						endAdornment: (
							<InputAdornment position="end">
								<IconButton onClick={() => findUserByClubCardCode()} edge="end">
									<MdOutlineSearch />
								</IconButton>
							</InputAdornment>
						),
					}}
					sx={{ mb: 3, marginTop: '10px' }}
				/>
			</Grid>
			<Divider />
		</>
	);
};
