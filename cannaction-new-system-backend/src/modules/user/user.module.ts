import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClubCardCodeListModule } from '../club-card-code-list/club-card-code-list.module';
import { CountryModule } from '../country/country.module';
import { DatabaseModule } from '../database/database.module';
import { ExtractModule } from '../extract/extract.module';
import { LanguageModule } from '../language/language.module';
import { ProfilePontuationModule } from '../profile-pontuation/profile-pontuation.module';
import { StoreModule } from '../store/store.module';
import { UserRepository } from './repositories/user.repository';
import { UserS3Repository } from './repositories/user.s3.repository';
import { UserPersistenceService } from './services/user-persistence.service';
import { UserService } from './services/user.service';
import { UserController } from './user.controller';
import { User } from './user.entity';

@Module({
	imports: [
		TypeOrmModule.forFeature([User]),
		LanguageModule,
		StoreModule,
		ProfilePontuationModule,
		ExtractModule,
		forwardRef(() => CountryModule),
		StoreModule,
		DatabaseModule,
		ClubCardCodeListModule
	],
	providers: [UserService, UserRepository, UserPersistenceService, UserS3Repository],
	controllers: [UserController],
	exports: [UserService, UserPersistenceService],
})
export class UserModule {}
