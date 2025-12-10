import { useQuery } from '@tanstack/react-query';
import StockService from '../../../services/StockService';

const STALE_TIME = 300000;
const KEY = 'stock-items';

export const useStockItems = () => {
	const { data, refetch, isLoading, isRefetching } = useQuery(
		[KEY],
		async () => {
			return StockService.getForSales();
		},
		{
			staleTime: STALE_TIME,
		}
	);
	return { data, refetch, isLoading, isRefetching };
};
