import {
	Grid,
	IconButton,
	Switch,
	TextField,
	Tooltip,
	Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { BsCheck2 } from '../../../../../themes/icons';

import { useSnackbar } from '../../../../../contexts/Snackbar';
import StoreService from '../../../../../services/StoreService';
import { useTranslation } from 'react-i18next';

interface Props {
	id: number;
	slug: string;
}

export const Head: React.FC<Props> = ({ id, slug }) => {
	const [storeSlug, setStoreSlug] = useState<string>(
		slug !== undefined ? slug : ''
	);
	const [inputVisible, setInputVisible] = useState<boolean>(slug !== undefined);
	const { openSnackbar } = useSnackbar();
	const borderColor = '#dfe1e1';
	const { t } = useTranslation();

	const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setInputVisible(event.target.checked);
		if (event.target.checked == false) {
			setStoreSlug('');
			handleChangeStoreSlug();
		}
	};

	const handleChangeStoreSlug = async () => {
		try {
			await StoreService.updateStoreSlug(
				id,
				storeSlug !== '' ? storeSlug : undefined
			);
			openSnackbar(t('marketing.storesSetting.storeSlugUpdated'), 'success');
		} catch (e) {
			openSnackbar(e, 'error');
		}
	};

	return (
		<Grid
			boxShadow="0.15rem 0 1.75rem 0 rgba(33, 40, 50, 0.15)"
			container
			mb={2}
			sx={{
				background: '#F8F8F9',
				borderBottom: `1px solid  ${borderColor}`,
				borderRadius: '6px',
				marginTop: '15px',
			}}
			p={2}
			justifyContent={'space-between'}
			alignItems={'center'}
			alignContent={'center'}
		>
			<Typography
				variant="h4"
				fontSize={'1.075rem'}
				fontWeight={600}
				color={'primary'}
			>
				{t('marketing.storesSetting.linkCustomeRegister')}
			</Typography>
			<Switch checked={inputVisible} onChange={handleSwitchChange} />
			{inputVisible && (
				<Grid item sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
					<TextField
						fullWidth
						size="small"
						variant="outlined"
						placeholder={t('marketing.storesSetting.storeSlug')}
						value={storeSlug}
						onChange={(e) => setStoreSlug(e.target.value)}
						InputProps={{
							endAdornment: (
								<Tooltip title={t('marketing.storesSetting.saveButtonLinkTooltip')}>
									<IconButton onClick={handleChangeStoreSlug}>
										<BsCheck2 />
									</IconButton>
								</Tooltip>
							),
						}}
					/>
				</Grid>
			)}
		</Grid>
	);
};
