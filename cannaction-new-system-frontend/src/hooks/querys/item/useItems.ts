import { useQuery } from '@tanstack/react-query';
import ItemService from '../../../services/ItemService';
import { PaginationFilterItemRequest } from '../../../dtos/requests/PaginationFilterItemRequest';

const KEY = 'items';

type Options = {
	enabled?: boolean;
};

export const useItems = (
	filter?: PaginationFilterItemRequest,
	options?: Options
) => {
	const { data, refetch, isLoading, isRefetching } = useQuery(
		[KEY, filter],
		async () => {
			return ItemService.getItemList(filter);
		},
		{
			staleTime: 0,
			cacheTime: 0,
			refetchOnWindowFocus: true,
			...options,
		}
	);

	return { data, refetch, isLoading, isRefetching };
};
