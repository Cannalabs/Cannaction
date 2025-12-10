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
import { PrizeType } from './enums/prize-type.enum';

@Entity('store_target')
export class StoreTarget extends RDSBase<number> {
	@PrimaryGeneratedColumn('increment')
	id: number;

	@ManyToOne(() => Store)
	@JoinColumn({ name: 'store_id' })
	store: Store;

	@Column({ name: 'target' })
	target: number;

	@Column({ name: 'concluded', nullable: true })
	concluded?: boolean;

	@Column({ name: 'final_date_target' })
	finalDateTarget: Date;

	@Column({ name: 'prize_type' })
	prizeType: PrizeType;

	@ManyToOne(() => Item)
	@JoinColumn({ name: 'prize_item_id' })
	prizeItem?: Item;

	@Column({ name: 'prize_money', nullable: true })
	prizeMoney?: number;

	@Column({ name: 'progress' })
	progress: number;

	@Column({ name: 'success', nullable: true })
	success?: boolean;

	@Column({ name: 'active' })
	active: boolean;

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

	constructor(options?: Partial<StoreTarget>) {
		super(options);
	}
}
