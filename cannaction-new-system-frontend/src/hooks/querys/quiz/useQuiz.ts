import { useQuery } from '@tanstack/react-query';
import QuizService from '../../../services/QuizService';
import { queryClient } from '../../../utils/query';
import QuizzEntity from '../../../models/entities/QuizEntity';

const KEY = 'quiz';

export const useQuiz = (id: number) => {
	const { data, isLoading, refetch, isRefetching } = useQuery(
		[KEY, id],
		() => (id ? QuizService.getById(id) : null),
		{
			refetchOnMount: true,
			refetchOnReconnect: false,
			refetchOnWindowFocus: false,
		}
	);

	return {
		data,
		isLoading,
		refetch,
		isRefetching,
	};
};

/**
 * @see {@link https://react-query-v3.tanstack.com/reference/QueryClient#queryclientsetqueriesdata}
 */
export const setQuiz = (data: QuizzEntity) => {
	queryClient.setQueriesData([KEY, data?.id], data);
};

/**
 * @see {@link https://react-query-v3.tanstack.com/reference/QueryClient#queryclientremovequeries}
 */
export const removeQuiz = (id: number) => {
	queryClient.removeQueries([KEY, id]);
};

const handleFunction = async (id: number) => {
	const quiz = await QuizService.getById(id);
	return quiz;
};

export const prefetchQuiz = (id: number) => {
	queryClient.prefetchQuery([KEY, id], () => handleFunction(id));
};
