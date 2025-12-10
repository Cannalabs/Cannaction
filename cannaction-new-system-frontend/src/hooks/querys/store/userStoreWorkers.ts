import { ResetQueryFilters, useQuery } from '@tanstack/react-query';
import StoreService from '../../../services/StoreService';
import { queryClient } from '../../../utils/query';
import PaginationFilterStoreRequest from '../../../dtos/requests/PaginationFilterStoreRequest';

const STALE_TIME = 300000; // 30 seconds

const KEY = 'store-workers';

export const useStoreWorkers = (id: number, filter?: PaginationFilterStoreRequest) => {
    const { data, isLoading, isRefetching, refetch } = useQuery(
        [KEY, filter],
        async () => {
            return StoreService.getStoreWorkers(id, filter);
        },
        {
            staleTime: STALE_TIME,
        } 
    );

    return {
        data,
        isLoading,
        isRefetching,
        refetch,
    };
};

export const resetStoreWorkers = async (filters?: ResetQueryFilters) => {
    await queryClient.resetQueries([KEY], filters).catch(console.error);
};

export const removeStoreWorkers = () => {
    queryClient.removeQueries([KEY]);
};
