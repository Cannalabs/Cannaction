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

@Entity('stock')
export class Stock extends RDSBase<number> {
	@PrimaryGeneratedColumn('increment')
	id: number;

	@ManyToOne(() => Store)
	@JoinColumn({ name: 'store_id' })
	store: Store;

	@ManyToOne(() => Item)
	@JoinColumn({ name: 'item_id' })
	item: Item;

	@Column({ name: 'input' })
	input: number;

	@Column({ name: 'output' })
	output: number;

	@Column({ name: 'minimum_amount' })
	minimumAmount: number;

	@Column({ name: 'total' })
	total: number;

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

	constructor(options?: Partial<Stock>) {
		super(options);
	}
}
