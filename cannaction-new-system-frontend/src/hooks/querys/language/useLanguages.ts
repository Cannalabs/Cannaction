import { ResetQueryFilters, useQuery } from '@tanstack/react-query';
import LanguageService from '../../../services/LanguageService';
import { queryClient } from '../../../utils/query';

const STALE_TIME = 30000; // 30 seconds

const KEY = 'languages';

type Options = {
	staleTime?: number;
	enabled?: boolean;
};

export const useLanguages = (options?: Options) => {
	const { data, isLoading, isRefetching, refetch } = useQuery(
		[KEY],
		() => LanguageService.getLanguages(),
		{
			staleTime: STALE_TIME,
			...options,
		}
	);

	return {
		data,
		isLoading,
		isRefetching,
		refetch,
	};
};

export const resetLanguages = async (filters?: ResetQueryFilters) => {
	await queryClient.resetQueries([KEY], filters).catch(console.error);
};

export const removeLanguages = () => {
	queryClient.removeQueries([KEY]);
};
