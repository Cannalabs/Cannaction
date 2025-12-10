import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	JoinTable,
	ManyToMany,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from 'typeorm';
import { Country } from '../country/country.entity';
import { RDSBase } from '../database/entities/rds-base.entity';
import { Item } from '../item/item.entity';
import { Store } from '../store/store.entity';

@Entity('promotion')
export class Promotion extends RDSBase<number> {
	@PrimaryGeneratedColumn('increment')
	id: number;

	@Column({ name: 'name' })
	name: string;

	@Column({ name: 'email_text' })
	emailText: string;

	@Column({ name: 'coupons' })
	coupons: number;

	@Column({ name: 'max_coupons' })
	maxCoupons: number;

	@Column({ name: 'thumb', nullable: true })
	thumb?: string;

	@Column({ name: 'active' })
	active: boolean;

	@ManyToOne(() => Country)
	@JoinColumn({ name: 'country_id' })
	country: Country;

	@Column({ name: 'begin_date' })
	beginDate: Date;

	@Column({ name: 'final_date' })
	finalDate: Date;

	@ManyToOne(() => Item)
	@JoinColumn({ name: 'item_id' })
	item: Item;

	@ManyToMany(() => Store, (item) => item.promotions, { cascade: true })
	@JoinTable({
		name: 'promotion_store',
		joinColumn: {
			name: 'promotion_id',
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

	@Column({ name: 'last_interaction_date' })
	lastInteractionDate: Date;

	setId(id: number): void {
		this.id = id;
	}
	getId(): number {
		return this.id;
	}

	constructor(options?: Partial<Promotion>) {
		super(options);
	}
}
