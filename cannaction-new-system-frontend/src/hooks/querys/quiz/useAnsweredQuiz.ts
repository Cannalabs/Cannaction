import { ResetQueryFilters, useQuery } from '@tanstack/react-query';
import { queryClient } from '../../../utils/query';
import QuizService from '../../../services/QuizService';
import PaginationFilterQuizzesRequest from '../../../dtos/requests/PaginationFilterQuizesRequest';

const STALE_TIME = 300000; // 30 seconds

const KEY = 'answered-quizes';

export const useAnsweredQuizes = (params?: PaginationFilterQuizzesRequest) => {
	const { data, isLoading, isRefetching, refetch } = useQuery(
		[KEY],
		() => QuizService.getAnsweredQuiz(params),
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

export const resetQuizs = async (filters?: ResetQueryFilters) => {
	await queryClient.resetQueries([KEY], filters).catch(console.error);
};

export const removeQuizs = () => {
	queryClient.removeQueries([KEY]);
};
