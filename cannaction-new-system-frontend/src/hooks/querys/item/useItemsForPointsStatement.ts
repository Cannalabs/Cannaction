import { useQuery } from '@tanstack/react-query';
import ItemService from '../../../services/ItemService';
import { PaginationFilterItemRequest } from '../../../dtos/requests/PaginationFilterItemRequest';

const KEY = 'item-points-statement';
const STALE_TIME = 300000;


export const useItemsForPointsStatement = (
	filter?: PaginationFilterItemRequest,
) => {
	const { data, refetch, isLoading, isRefetching } = useQuery(
		[KEY, filter],
		async () => {
			return ItemService.getForPointsStatement(filter);
		},
		{
            staleTime: STALE_TIME,
		}
	);

	return { data, refetch, isLoading, isRefetching };
};
