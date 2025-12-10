import { useQuery } from '@tanstack/react-query';
import StockService from '../../../services/StockService';
import PaginationFilterStockRequest from '../../../dtos/requests/PaginationFilterStockRequest';

const STALE_TIME = 300000;
const KEY = 'stock-store-settings';

export const useStockForStoreSettings = (id: number, filter?: PaginationFilterStockRequest) => {
	const { data, refetch, isLoading, isRefetching } = useQuery(
		[KEY, filter],
		async () => {
			return StockService.getStockForStoreSettings(id, filter);
		},
		{
			staleTime: STALE_TIME,
		}
	);
	return { data, refetch, isLoading, isRefetching };
};
