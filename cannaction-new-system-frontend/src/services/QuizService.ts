import { CreateQuizRequest } from '../dtos/requests/CreateQuizRequest';
import { UpdateQuizRequest } from '../dtos/requests/UpdateQuizRequest';
import PaginationFilterQuizzesRequest from '../dtos/requests/PaginationFilterQuizesRequest';
import ResponsePagination from '../dtos/responses/ResponsePaginationResponse';
import QuizzEntity from '../models/entities/QuizEntity';
import { getJWTAuthHeader } from '../utils/auth';
import { api } from '../utils/axios';
import { AnswerQuizRequest } from '../dtos/requests/AnswerQuizRequest';

export default class QuizService {
	static getQuizList(params?: PaginationFilterQuizzesRequest) {
		return api
			.get<ResponsePagination<QuizzEntity>>('quiz', {
				headers: getJWTAuthHeader(),
				params,
			})

			.then((response) => response.data);
	}

	static getUnansweredQuiz(params?: PaginationFilterQuizzesRequest) {
		return api
			.get<ResponsePagination<QuizzEntity>>('quiz/unanswered-quiz', {
				headers: getJWTAuthHeader(),
				params,
			})
			.then((response) => response.data);
	}

	static getAnsweredQuiz(params?: PaginationFilterQuizzesRequest) {
		return api
			.get<ResponsePagination<QuizzEntity>>('quiz/answered-quiz', {
				headers: getJWTAuthHeader(),
				params,
			})
			.then((response) => response.data);
	}

	static getById(id: number) {
		return api
			.get<QuizzEntity>(`quiz/${id}`, {
				headers: getJWTAuthHeader(),
			})
			.then((response) => response.data);
	}

	static async getLabeled(id: number) {
		return api.get<QuizzEntity[]>(`quiz/labeled/${id}`, {
			headers: getJWTAuthHeader(),
		});
	}

	static async changeQuizStatus(id: number, status: boolean) {
		await api.put(`quiz/${id}/${status ? 'unpublish' : 'publish'}`, undefined, {
			headers: getJWTAuthHeader(),
		});
	}

	static async deleteQuiz(id: number) {
		await api.delete(`quiz/${id}`, {
			headers: getJWTAuthHeader(),
		});
	}

	static async createQuiz(body: CreateQuizRequest) {
		return api
			.post('quiz', body, { headers: getJWTAuthHeader() })
			.then((response) => response.data);
	}

	static async updateQuiz(id: number, body: UpdateQuizRequest) {
		return api
			.put(`quiz/${id}`, body, { headers: getJWTAuthHeader() })
			.then((response) => response.data);
	}

	static async answerQuiz(body: AnswerQuizRequest) {
		await api.post('quiz/answer-quiz', body, {
			headers: getJWTAuthHeader(),
		});
	}
}
