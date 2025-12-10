import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnswerModule } from '../answer/answer.module';
import { CountryModule } from '../country/country.module';
import { DatabaseModule } from '../database/database.module';
import { ExtractModule } from '../extract/extract.module';
import { QuestionModule } from '../question/question.module';
import { UserModule } from '../user/user.module';
import { QuizUser } from './entities/quizz-user.entity';
import { Quizz } from './entities/quizz.entity';
import { QuizzController } from './quizz.controller';
import { QuizzRepository } from './quizz.repository';
import { QuizzPersistenceService } from './services/quizz-persistence.service';
import { QuizzService } from './services/quizz.service';

@Module({
	imports: [
		TypeOrmModule.forFeature([Quizz, QuizUser]),
		CountryModule,
		QuestionModule,
		DatabaseModule,
		forwardRef(() => AnswerModule),
		UserModule,
		ExtractModule
	],
	providers: [QuizzService, QuizzRepository, QuizzPersistenceService],
	controllers: [QuizzController],
	exports: [QuizzService],
})
export class QuizzModule {}
