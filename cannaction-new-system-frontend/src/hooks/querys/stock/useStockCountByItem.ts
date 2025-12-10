import { useQuery } from '@tanstack/react-query';
import StockService from '../../../services/StockService';

const STALE_TIME = 300000;
const KEY = 'stock-count-by-item';

export const useStockCountByItem = (id?: number) => {
    const { data, refetch, isLoading, isRefetching } = useQuery(
        [KEY],
        async () => {
            if (!id) return 0;
            return StockService.getCountByItem(id);
        },
        {
            staleTime: STALE_TIME,
        }
    );
    return { data, refetch, isLoading, isRefetching };
};
