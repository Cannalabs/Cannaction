import { ResetQueryFilters, useQuery } from '@tanstack/react-query';
import { queryClient } from '../../../utils/query';
import QuestionService from '../../../services/QuestionService';

const STALE_TIME = 300000; // 30 seconds

const KEY = 'questions';

export const useQuestions = (id: number) => {
	const { data, isLoading, isRefetching, refetch } = useQuery(
		[KEY],
		() => QuestionService.getQuestionByQuiz(id),
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

export const resetQuestions = async (filters?: ResetQueryFilters) => {
	await queryClient.resetQueries([KEY], filters).catch(console.error);
};

export const removeQuestions = () => {
	queryClient.removeQueries([KEY]);
};
