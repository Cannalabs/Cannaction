import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { RDSBase } from '../database/entities/rds-base.entity';
import { Store } from '../store/store.entity';
import { User } from '../user/user.entity';

@Entity('change_shop')
export class ChangeShop extends RDSBase<number> {
	@PrimaryGeneratedColumn('increment')
	id: number;

	@ManyToOne(() => User)
	@JoinColumn({ name: 'user_id' })
	user: User;

	@ManyToOne(() => Store)
	@JoinColumn({ name: 'origin_store_id' })
	originStore: Store;

	@ManyToOne(() => Store)
	@JoinColumn({ name: 'destiny_store_id' })
	destinyStore: Store;

	@Column({ name: 'reason' })
	reason: string;

	@Column({ name: 'aproved', nullable: true })
	aproved?: boolean;

	@Column({ name: 'answer_date', nullable: true })
	answerDate?: Date;

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

	constructor(options?: Partial<ChangeShop>) {
		super(options);
	}
}
