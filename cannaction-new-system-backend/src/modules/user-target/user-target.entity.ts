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
import { Item } from '../item/item.entity';
import { Store } from '../store/store.entity';
import { User } from '../user/user.entity';

@Entity('user_target')
export class UserTarget extends RDSBase<number> {
	@PrimaryGeneratedColumn('increment')
	id: number;

	@ManyToOne(() => Store)
	@JoinColumn({ name: 'store_id' })
	store: Store;

	@ManyToOne(() => User)
	@JoinColumn({ name: 'user_id' })
	user: User;

	@ManyToOne(() => Item)
	@JoinColumn({ name: 'prize_item_id' })
	prizeItem: Item;

	@Column({ name: 'target' })
	target: number;

	@Column({ name: 'progress' })
	progress: number;

	@Column({ name: 'success', nullable: true })
	success?: boolean;

	@Column({ name: 'concluded', nullable: true })
	concluded?: boolean;

	@Column({ name: 'active' })
	active: boolean;

	@Column({ name: 'target_final_date' })
	targetFinalDate: Date;

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

	constructor(options?: Partial<UserTarget>) {
		super(options);
	}
}
