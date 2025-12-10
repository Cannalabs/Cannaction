import { ResetQueryFilters, useQuery } from '@tanstack/react-query';
import { queryClient } from '../../../utils/query';
import StoreTargetService from '../../../services/StoreTargetService';

const STALE_TIME = 300000; // 30 seconds

const KEY = 'requested-store-targets';

export const useRequestedStoreTargets = (    
) => {
    const {
        data,
        isLoading,
        isRefetching,
        refetch,
    } = useQuery([KEY], () => StoreTargetService.getRequestedTargets(), {
        staleTime: STALE_TIME,
    });

    return {
        data,
        isLoading,
        isRefetching,
        refetch,
    };
};

export const resetUserTargets = async (filters?: ResetQueryFilters) => {
    await queryClient.resetQueries([KEY], filters).catch(console.error);
};

export const removeUserTargets = () => {
    queryClient.removeQueries([KEY]);
};
