import { ResetQueryFilters, useQuery } from '@tanstack/react-query';
import ProfilePontuationService from '../../../services/ProfilePontuationService';
import { queryClient } from '../../../utils/query';

const STALE_TIME = 300000; // 30 seconds

const KEY = 'profile-pontuations';

type Options = {
	staleTime?: number;
	enabled?: boolean;
};

export const useProfilePontuations = (options?: Options) => {
	const {
		data = [],
		isLoading,
		isRefetching,
		refetch,
	} = useQuery([KEY], () => ProfilePontuationService.findAll(), {
		staleTime: STALE_TIME,
		...options,
	});

	return {
		data,
		isLoading,
		isRefetching,
		refetch,
	};
};

export const resetProfilePontuations = async (filters?: ResetQueryFilters) => {
	await queryClient.resetQueries([KEY], filters).catch(console.error);
};

export const removeProfilePontuations = () => {
	queryClient.removeQueries([KEY]);
};
