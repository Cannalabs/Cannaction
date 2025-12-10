import { QuestionEntity } from "../models/entities/QuestionEntity";
import { getJWTAuthHeader } from "../utils/auth";
import { api } from "../utils/axios";

export default class QuestionSerivce { 
    static async getQuestionByQuiz(id: number) {
        return api.get<QuestionEntity[]>(`question/${id}`, {
            headers: getJWTAuthHeader()
        }).then((response) => response.data);
    }
}