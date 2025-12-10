import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionModule } from '../question/question.module';
import { QuizzModule } from '../quizz/quizz.module';
import { UserModule } from '../user/user.module';
import { AnswerController } from './answer.controller';
import { Answer } from './answer.entity';
import { AnswerRepository } from './answer.repository';
import { AnswerPersistenceService } from './services/answer-persistence.service';
import { AnswerService } from './services/answer.service';

@Module({
	imports: [
		TypeOrmModule.forFeature([Answer]),
		forwardRef(() => QuizzModule),
		QuestionModule,
		UserModule,
	],
	providers: [AnswerService, AnswerRepository, AnswerPersistenceService],
	controllers: [AnswerController],
	exports: [AnswerService, AnswerPersistenceService],
})
export class AnswerModule {}
