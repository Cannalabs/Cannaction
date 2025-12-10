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
import { Item } from '../item/item.entity';
import { Store } from '../store/store.entity';
import { User } from '../user/user.entity';
import { ExtractOperator } from './enums/extract-operator.enum';

@Entity('extract')
export class Extract extends RDSBase<number> {
	@PrimaryGeneratedColumn('increment')
	id: number;

	@ManyToOne(() => Store)
	@JoinColumn({ name: 'store_id' })
	store?: Store;

	@ManyToOne(() => Item)
	@JoinColumn({ name: 'item_id' })
	item?: Item;

	@ManyToOne(() => User)
	@JoinColumn({ name: 'user_id' })
	user?: User;

	@Column({ name: 'description', nullable: true })
	description?: string;

	@Column({ name: 'points' })
	points: number;

	@Column({ name: 'amount' })
	amount: number;

	@Column({ name: 'operator' })
	operator: ExtractOperator;

	@Column({ name: 'total' })
	total: number

	@Column({ name: 'balance' })
	balance: number

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

	constructor(options?: Partial<Extract>) {
		super(options);
	}
}
