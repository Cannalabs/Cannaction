import {
	CreateDateColumn,
	Entity,
	JoinColumn,
	JoinTable,
	ManyToMany,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { RDSBase } from '../database/entities/rds-base.entity';
import { Item } from '../item/item.entity';
import { Store } from '../store/store.entity';
import { User } from '../user/user.entity';

@Entity('sale')
export class Sale extends RDSBase<number> {
	@PrimaryGeneratedColumn('increment')
	id: number;

	@ManyToOne(() => Item)
	@JoinColumn({ name: 'item_id' })
	item: Item;

	@ManyToOne(() => User)
	@JoinColumn({ name: 'user_id' })
	user: User;

	@ManyToOne(() => User)
	@JoinColumn({ name: 'customer_id' })
	customer?: User;

	@ManyToMany(() => Store, (item) => item.sales, { cascade: true })
	@JoinTable({
		name: 'store_sale',
		joinColumn: {
			name: 'sale_id',
			referencedColumnName: 'id',
		},
		inverseJoinColumn: {
			name: 'store_id',
			referencedColumnName: 'id',
		},
	})
	stores: Store[];

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

	constructor(options?: Partial<Sale>) {
		super(options);
	}
}
