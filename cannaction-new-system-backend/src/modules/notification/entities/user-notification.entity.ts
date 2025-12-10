import { RDSBase } from "@/modules/database/entities/rds-base.entity";
import { User } from "@/modules/user/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Notification } from "./notification.entity";

@Entity('user_notification')
export class UserNotification extends RDSBase<number> {
	@PrimaryGeneratedColumn('increment')
	id: number;

	@ManyToOne(() => User)
	@JoinColumn({ name: 'user_id' })
	user: User;

	@ManyToOne(() => Notification)
	@JoinColumn({ name: 'notification_id' })
	notification: Notification;

	@Column({ name: 'seen' })
	seen: boolean;

	@CreateDateColumn({ name: 'created_at' })
	createdAt: Date;

	@UpdateDateColumn({ name: 'updated_at' })
	updatedAt: Date;

	setId(id: number): void {
		this.id = id;
	}
	getId(): number {
		return this.id;
	}

	constructor(options?: Partial<UserNotification>) {
		super(options);
	}
}
