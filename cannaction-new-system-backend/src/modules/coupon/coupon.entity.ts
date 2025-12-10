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
import { Promotion } from '../promotion/promotion.entity';
import { Store } from '../store/store.entity';
import { User } from '../user/user.entity';

@Entity('coupon')
export class Coupon extends RDSBase<number> {
	@PrimaryGeneratedColumn('increment')
	id: number;

	@Column({ name: 'key_code' })
	keyCode: string;

	@ManyToOne(() => Promotion)
	@JoinColumn({ name: 'promotion_id' })
	promotion?: Promotion;

	@ManyToOne(() => Item)
	@JoinColumn({ name: 'item_id' })
	item?: Item;

	@Column({ name: 'item_amount', nullable: true })
	itemAmount?: number;

	@ManyToOne(() => User)
	@JoinColumn({ name: 'user_id' })
	user?: User;

	@ManyToOne(() => Store)
	@JoinColumn({ name: 'store_id' })
	store: Store;

	@Column({ name: 'description', nullable: true })
	description?: string;

	@Column({ name: 'checked' })
	checked: boolean;

	@Column({ name: 'checked_date', nullable: true })
	checkedDate?: Date;

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

	constructor(options?: Partial<Coupon>) {
		super(options);
	}
}
