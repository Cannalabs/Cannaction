import { Grid } from '@mui/material';
import React from 'react';
import { PromoTargetStoreTable } from './itemBackTable';
import { TargetsReachedOrExpiredTable } from './targetsReachedOrExpiredTable';
import { StoreTargetMarketingResponse } from '../../../../../dtos/responses/MarketingStoreTargetResponse';

interface Props {
	storeTargets: StoreTargetMarketingResponse | undefined;
	loading: boolean;
	handleTargetStatus: (id: number, status: boolean) => void;
	handleDeleteTarget: (id: number) => void;
	setSearchConcluded: React.Dispatch<React.SetStateAction<string>>;
	setSearchNotConcluded: React.Dispatch<React.SetStateAction<string>>;

	limit: number;
	setLimit: (limit: number) => void;
	currentPage: number;
	setCurrentPage: (page: number) => void;
	search: string;
	setSearch: React.Dispatch<React.SetStateAction<string>>;
}

export const PromoTargetStore: React.FC<Props> = ({
	storeTargets,
	loading,
	handleTargetStatus,
	handleDeleteTarget,
	setSearchConcluded,
	setSearchNotConcluded,
	limit,
	setLimit,
	currentPage,
	setCurrentPage,
	search,
	setSearch,
}) => {
	return (
		<Grid my="1rem" borderRadius=".35rem" xs={4.8} sm={12} gap={2} container>
			<PromoTargetStoreTable
				notConcluded={storeTargets?.notConcluded}
				loading={loading}
				meta={storeTargets?.notConcluded.meta}
				handleTargetStatus={handleTargetStatus}
				handleDeleteTarget={handleDeleteTarget}
				setSearchNotConcluded={setSearchNotConcluded}
				limit={limit}
				setLimit={setLimit}
				currentPage={currentPage}
				setCurrentPage={setCurrentPage}
				search={search}
				setSearch={setSearch}
			/>
			<TargetsReachedOrExpiredTable
				concluded={storeTargets?.concluded}
				meta={storeTargets?.concluded.meta}
				loading={loading}
				setSearchConcluded={setSearchConcluded}
				limit={limit}
				setLimit={setLimit}
				currentPage={currentPage}
				setCurrentPage={setCurrentPage}
				search={search}
				setSearch={setSearch}
			/>
		</Grid>
	);
};
