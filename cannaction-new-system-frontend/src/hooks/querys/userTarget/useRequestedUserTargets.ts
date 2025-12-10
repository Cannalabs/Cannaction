import { ResetQueryFilters, useQuery } from '@tanstack/react-query';
import UserTargetService from '../../../services/UserTargetService';
import { queryClient } from '../../../utils/query';

const STALE_TIME = 300000; // 30 seconds

const KEY = 'requested-user-targets';

export const useRequestedUserTargets = (    
) => {
    const {
        data,
        isLoading,
        isRefetching,
        refetch,
    } = useQuery([KEY], () => UserTargetService.getRequestedTargets(), {
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
