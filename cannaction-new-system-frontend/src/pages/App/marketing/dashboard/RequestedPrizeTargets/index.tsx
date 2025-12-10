import React, { useEffect } from 'react';
import { useRequestedStoreTargets } from '../../../../../hooks/querys/storeTarget/useRequestedStoreTargets';
import { useRequestedUserTargets } from '../../../../../hooks/querys/userTarget/useRequestedUserTargets';
import { StoreTarget } from './StoreTarget';
import { UserTarget } from './UserTarget';

export const RequestedPrizeTargets: React.FC = () => {
	const { data: storeTargets, refetch: refetchStoreTargets } =
		useRequestedStoreTargets();
	const { data: userTargets, refetch: refetchUserTargets } =
		useRequestedUserTargets();

	useEffect(() => {
		refetchStoreTargets();
		refetchUserTargets();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className='row'>
			{storeTargets?.map((t) => (
				<StoreTarget storeTarget={t} refetch={refetchStoreTargets} />
			))}
			{userTargets?.map((t) => (
				<UserTarget userTarget={t} refetch={refetchUserTargets} />
			))}
		</div>
	);
};
