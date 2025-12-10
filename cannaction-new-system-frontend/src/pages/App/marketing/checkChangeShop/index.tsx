import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { ShopToCheck } from './shopToCheck';
import { HistoryCheckShops } from './historyCheckShops';
import { useChangeShops } from '../../../../hooks/querys/changeShop/useChangeShops';
import ChangeShopService from '../../../../services/ChangeShopService';
import { useModal } from '../../../../contexts/ModalMessage';
import { useSnackbar } from '../../../../contexts/Snackbar';
import { useTranslation } from 'react-i18next';

export const CheckChangeShop: React.FC = () => {
	const [search, setSearch] = useState<string>('');
	const [searchAnswered, setSearchAnswered] = useState<string>('');
	const [searchConfirmed, setSearchConfirmed] = useState<string>('');
	const { showError } = useModal();
	const { openSnackbar } = useSnackbar();
	const { t } = useTranslation();

	const {
		data: changes,
		isLoading,
		refetch,
		isRefetching,
	} = useChangeShops({ search, searchAnswered });

	//TODO: seperar hooks pra paginação ficar do jeito certo

	useEffect(() => {
		refetch();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchConfirmed]);

	const handleAcceptChange = async (id: number, accept: boolean) => {
		try {
			await ChangeShopService.acceptChangeShop(id, accept);
			openSnackbar(
				`${t('marketing.checkChangShop.changeShopRequest')} ${
					accept
						? t('marketing.checkChangShop.accepted')
						: t('marketing.checkChangShop.denied')
				}`,
				'success'
			);
			refetch();
		} catch (e) {
			showError(e);
		}
	};

	return (
		<div className="container-xl px-4 mt-n10">
			<ShopToCheck
				search={search}
				setSearch={setSearch}
				data={changes?.notAnswered}
				loading={isLoading || isRefetching}
				handleAcceptChangeShop={handleAcceptChange}
				setSearchConfirmed={setSearchConfirmed}
			/>
			<Grid mt={2}>
				<HistoryCheckShops
					setSearchConfirmed={setSearchConfirmed}
					search={searchAnswered}
					setSearch={setSearchAnswered}
					data={changes?.answered}
					loading={isLoading || isRefetching}
				/>
			</Grid>
		</div>
	);
};
