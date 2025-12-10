import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionController } from './question.controller';
import { Question } from './question.entity';
import { QuestionRepository } from './question.repository';
import { QuestionPersistenceService } from './services/question-persistence.service';
import { QuestionService } from './services/question.service';

@Module({
	imports: [TypeOrmModule.forFeature([Question])],
	providers: [QuestionService, QuestionRepository, QuestionPersistenceService],
	controllers: [QuestionController],
	exports: [QuestionService, QuestionPersistenceService],
})
export class QuestionModule {}
