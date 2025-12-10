import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StateController } from './state.controller';
import { State } from './state.entity';
import { StateRepository } from './state.repository';
import { StateService } from './state.service';

@Module({
	imports: [TypeOrmModule.forFeature([State])],
	providers: [StateService, StateRepository],
	controllers: [StateController],
	exports: [StateService],
})
export class StateModule {}
