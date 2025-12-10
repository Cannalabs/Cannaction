import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from 'typeorm';
import { RDSBase } from '../database/entities/rds-base.entity';
import { User } from '../user/user.entity';
import { InviteStatusEnum } from './enums/invite-status.enum';

@Entity('invite_friend')
export class InviteFriend extends RDSBase<number> {
	@PrimaryGeneratedColumn('increment')
	id: number;

	@Column({ name: 'email' })
	email: string;

	@Column({ name: 'status' })
	status: InviteStatusEnum;

	@Column({ name: 'code' })
	code: string;

	@ManyToOne(() => User)
	@JoinColumn({ name: 'user_id' })
	user: User;

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

	constructor(options?: Partial<InviteFriend>) {
		super(options);
	}
}
