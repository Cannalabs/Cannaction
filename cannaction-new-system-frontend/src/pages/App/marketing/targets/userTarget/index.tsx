import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { PromoTargetUserTable } from './userTargetTable';
import { TargetsReachedOrExpiredTable } from './targetsReachedOrExpiredTable';
import { useSnackbar } from '../../../../../contexts/Snackbar';
import { useUserTargets } from '../../../../../hooks/querys/userTarget/useUserTargets';
import UserTargetService from '../../../../../services/UserTargetService';

interface Props {
	country: number | undefined;
	store: number | undefined;
}

export const PromoTargetUser: React.FC<Props> = ({ country, store }) => {
	const [searchConcluded, setSearchConcluded] = useState<string>('');
	const [searchNotConcluded, setSearchNotConcluded] = useState<string>('');
	const { openSnackbar } = useSnackbar();

	const filter = {
		countryId: country,
		storeId: store,
		searchNotConcluded,
		searchConcluded,
	};

	const {
		data: userTargets,
		refetch,
		isRefetching,
		isLoading,
	} = useUserTargets(filter);

	useEffect(() => {
		refetch();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchConcluded, searchNotConcluded, country, store]);

	const handleTargetStatus = async (id: number, status: boolean) => {
		try {
			await UserTargetService.handleUserTargetStatus(id, status);
			openSnackbar('Target Status updated Successfully!', 'success');
			refetch();
		} catch (e: unknown) {
			openSnackbar(e, 'error');
		}
	};

	const handleDeleteTarget = async (id: number) => {
		try {
			await UserTargetService.delete(id);
			openSnackbar('Target deleted Successfully!', 'success');
			refetch();
		} catch (e: unknown) {
			openSnackbar(e, 'error');
		}
	};

	return (
		<Grid my="1rem" borderRadius=".35rem" xs={4.8} sm={12} gap={2} container>
			<PromoTargetUserTable
				refetch={refetch}
				notConcluded={userTargets?.notConcluded ?? undefined}
				loading={isRefetching || isLoading}
				handleTargetStatus={handleTargetStatus}
				handleDeleteTarget={handleDeleteTarget}
				setSearchNotConcluded={setSearchNotConcluded}
			/>
			<TargetsReachedOrExpiredTable
				concluded={userTargets?.concluded ?? undefined}
				loading={isRefetching || isLoading}
				setSearchConcluded={setSearchConcluded}
			/>
		</Grid>
	);
};
