import { useQuery } from '@tanstack/react-query';

import { queryClient } from '../../../utils/query';
import ItemService from '../../../services/ItemService';
import { ItemEntity } from '../../../models/entities/ItemEntity';

const KEY = 'item';

export const useItem = (id: number | undefined) => {
	const { data, isLoading, refetch, isRefetching } = useQuery(
		[KEY, id],
		() => (id ? ItemService.getById(id) : null),
		{
			refetchOnMount: true,
			refetchOnReconnect: false,
			refetchOnWindowFocus: false,
		}
	);

	return {
		data,
		isLoading,
		refetch,
		isRefetching,
	};
};

/**
 * @see {@link https://react-query-v3.tanstack.com/reference/QueryClient#queryclientsetqueriesdata}
 */
export const setItem = (data: ItemEntity) => {
	queryClient.setQueriesData([KEY, data?.id], data);
};

/**
 * @see {@link https://react-query-v3.tanstack.com/reference/QueryClient#queryclientremovequeries}
 */
export const removeItem = (id: number) => {
	queryClient.removeQueries([KEY, id]);
};

const handleFunction = async (id: number) => {
	const item = await ItemService.getById(id);
	return item;
};

export const prefetchItem = (id: number) => {
	queryClient.prefetchQuery([KEY, id], () => handleFunction(id));
};
