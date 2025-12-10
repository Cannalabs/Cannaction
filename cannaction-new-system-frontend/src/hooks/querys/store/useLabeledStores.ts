import { useQuery } from '@tanstack/react-query';
import StoreService from '../../../services/StoreService';

const STALE_TIME = 300000;
const KEY = 'labeled-stores';

export type StoreType = {
	value: number;
	label: string;
};

export const useStoreLabeled = () => {
	const { data = [], refetch, isLoading } = useQuery(
		[KEY],
		async () => {
			const dataResult =
				await StoreService.getLabeledStores();
			return dataResult?.map(
				(c) =>
					({
						value: c.id,
						label: c.name,
					} as StoreType)
			);
		},
		{
			staleTime: STALE_TIME,
		}
	);
	return { stores: data, refetch, isLoading };
};
