import { Country } from "@/modules/country/country.entity";
import { RDSBase } from "@/modules/database/entities/rds-base.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { NotificationUserType } from "../enums/notification-type.enum";
import { UserNotification } from "./user-notification.entity";


@Entity('notification')
export class Notification extends RDSBase<number> {
	@PrimaryGeneratedColumn('increment')
	id: number;

	@Column({ name: 'title' })
	title: string;

	@Column({ name: 'body' })
	body: string;

	@Column({ name: 'active' })
	active: boolean;

	@ManyToOne(() => Country)
	@JoinColumn({ name: 'country_id' })
	country: Country;

	@Column({ name: 'user_type' })
	userType: NotificationUserType

	@OneToMany(() => UserNotification, (item) => item.notification)
	userNotifications: UserNotification[];

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

	constructor(options?: Partial<Notification>) {
		super(options);
	}

}
