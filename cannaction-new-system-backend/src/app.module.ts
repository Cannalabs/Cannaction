import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModuleModule } from './modules/modules.module';
import { getDbConfig } from './utils/datasource-factory';
import { AppController } from './app.controller';


@Module({
	imports: [ModuleModule, ScheduleModule.forRoot(),
		TypeOrmModule.forRoot({ ...getDbConfig() })],
	controllers: [AppController],
	providers: [],
})
export class AppModule {}
