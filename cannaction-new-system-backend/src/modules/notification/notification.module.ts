import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from '../database/database.module';
import { Notification } from './entities/notification.entity';
import { UserNotification } from './entities/user-notification.entity';
import { NotificationController } from './notification.controller';
import { NotificationRepository } from './repositories/notification.repository';
import { NotificationPersistenceService } from './services/notification-persistence.service';
import { NotificationService } from './services/notification.service';


@Module({
	imports: [TypeOrmModule.forFeature([Notification, UserNotification]), DatabaseModule],
	providers: [NotificationService, NotificationRepository, NotificationPersistenceService],
	controllers: [NotificationController],
	exports: [NotificationService, NotificationPersistenceService],
})
export class NotificationModule {}

