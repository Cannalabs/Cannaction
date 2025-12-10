import { ResetQueryFilters, useQuery } from '@tanstack/react-query';
import ExtractService from '../../../services/ExtractService';
import { queryClient } from '../../../utils/query';
import { PaginationFilterExtractRequest } from '../../../dtos/requests/PaginationFilterExtractRequest';

const STALE_TIME = 300000; // 30 seconds

const KEY = 'extracts';

export const useExtracts = (filter: PaginationFilterExtractRequest) => {
	const { data, isLoading, isRefetching, refetch } = useQuery(
		[KEY, filter],
		async () => {
			return ExtractService.getExtractListByUser(filter);
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

export const resetExtracts = async (filters?: ResetQueryFilters) => {
	await queryClient.resetQueries([KEY], filters).catch(console.error);
};

export const removeExtracts = () => {
	queryClient.removeQueries([KEY]);
};
