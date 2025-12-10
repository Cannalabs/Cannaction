import { useQuery } from '@tanstack/react-query';
import StoreService from '../../../services/StoreService';

const STALE_TIME = 300000;
const KEY = 'labeled-stores-by-country';

export type StoreType = {
	value: number;
	label: string;
};

export const useStoreLabeledByCountry = (countryId?: number) => {
	const { data = [], refetch, isLoading, isRefetching } = useQuery(
		[KEY],
		async () => {
			const dataResult =
				await StoreService.getLabeledStoresByCountryForFilter(countryId);
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
	return { stores: data, refetch, isLoading, isRefetching };
};
