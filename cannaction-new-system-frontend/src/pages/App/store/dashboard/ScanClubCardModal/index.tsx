import React, { useState } from 'react';
import {
	Divider,
	Grid,
	IconButton,
	InputAdornment,
	TextField,
} from '@mui/material';
import { BsUpc } from 'react-icons/bs';
import { MdOutlineSearch } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from '../../../../../contexts/Snackbar';
import UserService from '../../../../../services/UserService';
import { useTranslation } from 'react-i18next';

export const ScanClubCardModal: React.FC = () => {
	const [barcode, setBarcode] = useState<string>('');
	const navigate = useNavigate();
	const { openSnackbar } = useSnackbar();
	const {t} = useTranslation();

	const findUserByClubCardCode = async () => {
		try {
			const user = await UserService.findByClubCardCode(barcode);
			if (!user) {
				openSnackbar(t('store.storeDashboard.cardNotFound'), 'error');
			} else {
				navigate(`/sales-customer/${user.id}`);
			}
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
