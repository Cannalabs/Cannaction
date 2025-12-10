import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfilePontuationController } from './profile-pontuation.controller';
import { ProfilePontuation } from './profile-pontuation.entity';
import { ProfilePontuationRepository } from './profile-pontuation.repository';
import { ProfilePontuationPersistenceService } from './services/profile-pontuation-persistence.service';
import { ProfilePontuationService } from './services/profile-pontuation.service';

@Module({
	imports: [TypeOrmModule.forFeature([ProfilePontuation])],
	providers: [
		ProfilePontuationService,
		ProfilePontuationPersistenceService,
		ProfilePontuationRepository,
	],
	controllers: [ProfilePontuationController],
	exports: [ProfilePontuationService],
})
export class ProfilePontuationModule {}
