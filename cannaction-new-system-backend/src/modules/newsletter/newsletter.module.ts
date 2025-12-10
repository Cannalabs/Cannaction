import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from '../database/database.module';
import { NewsletterController } from './newsletter.controller';
import { Newsletter } from './newsletter.entity';
import { NewsletterRepository } from './newsletter.repository';
import { NewsletterPersistenceService } from './services/newsletter-persistence.service';
import { NewsletterService } from './services/newsletter.service';

@Module({
	imports: [TypeOrmModule.forFeature([Newsletter]), DatabaseModule],
	providers: [NewsletterService, NewsletterRepository, NewsletterPersistenceService],
	controllers: [NewsletterController],
	exports: [NewsletterService],
})
export class NewsletterModule {}
