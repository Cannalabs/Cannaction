import { ResetQueryFilters, useQuery } from '@tanstack/react-query';
import ChangeShopService from '../../../services/ChangeShopService';
import { queryClient } from '../../../utils/query';
import FindChangeShopsRequest from '../../../dtos/requests/FindChangeShopsRequest';

const STALE_TIME = 300000;
const KEY = 'change-shops';

type Options = {
	staleTime?: number;
	enabled?: boolean;
};

export const useChangeShops = (filter?: FindChangeShopsRequest, options?: Options) => {
	const { data, isLoading, isRefetching, refetch } = useQuery(
		[KEY],
		() => ChangeShopService.findChangeShops(filter),
		{
			staleTime: STALE_TIME,
			...options,
		}
	);

	return {
		data,
		isLoading,
		isRefetching,
		refetch,
	};
};

export const resetChangeShops = async (filters?: ResetQueryFilters) => {
	await queryClient.resetQueries([KEY], filters).catch(console.error);
};

export const removeChangeShops = () => {
	queryClient.removeQueries([KEY]);
};
