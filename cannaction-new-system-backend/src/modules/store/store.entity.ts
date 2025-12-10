import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	JoinTable,
	ManyToMany,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { City } from '../city/city.entity';
import { Country } from '../country/country.entity';
import { RDSBase } from '../database/entities/rds-base.entity';
import { Item } from '../item/item.entity';
import { Newsletter } from '../newsletter/newsletter.entity';
import { Promotion } from '../promotion/promotion.entity';
import { Sale } from '../sale/sale.entity';
import { State } from '../state/state.entity';
import { User } from '../user/user.entity';

@Entity('store')
export class Store extends RDSBase<number> {
	@PrimaryGeneratedColumn('increment')
	id: number;

	@Column({ name: 'name' })
	name: string;

	@Column({ name: 'contact_email', nullable: true })
	contactEmail: string;

	@Column({ name: 'contact_telephone', nullable: true })
	contactTelephone?: string;

	@ManyToOne(() => Country)
	@JoinColumn({ name: 'country_id' })
	country: Country;

	@ManyToOne(() => State)
	@JoinColumn({ name: 'state_id' })
	state?: State;

	@ManyToOne(() => City)
	@JoinColumn({ name: 'city_id' })
	city?: City;

	@Column({ name: 'address', nullable: true })
	address?: string;

	@Column({ name: 'logo', nullable: true })
	logo?: string;

	@Column({ name: 'slug', nullable: true })
	slug?: string;

	@Column({ name: 'active' })
	active: boolean;

	@Column({ name: 'points', default: 0 })
	points: number;

	@ManyToOne(() => User)
	@JoinColumn({ name: 'master_user_id' })
	masterUser?: User;

	@ManyToMany(() => Item, (item) => item.stores)
	@JoinTable({
		name: 'item_store',
		joinColumn: {
			name: 'store_id',
			referencedColumnName: 'id',
		},
		inverseJoinColumn: {
			name: 'item_id',
			referencedColumnName: 'id',
		},
	})
	items: Item[];

	@ManyToMany(() => Newsletter, (item) => item.stores)
	@JoinTable({
		name: 'newsletter_store',
		joinColumn: {
			name: 'store_id',
			referencedColumnName: 'id',
		},
		inverseJoinColumn: {
			name: 'newsletter_id',
			referencedColumnName: 'id',
		},
	})
	newsletters: Newsletter[];

	@ManyToMany(() => Promotion, (item) => item.stores)
	@JoinTable({
		name: 'promotion_store',
		joinColumn: {
			name: 'store_id',
			referencedColumnName: 'id',
		},
		inverseJoinColumn: {
			name: 'promotion_id',
			referencedColumnName: 'id',
		},
	})
	promotions: Item[];

	@ManyToMany(() => Sale, (item) => item.stores)
	@JoinTable({
		name: 'store_sale',
		joinColumn: {
			name: 'store_id',
			referencedColumnName: 'id',
		},
		inverseJoinColumn: {
			name: 'sale_id',
			referencedColumnName: 'id',
		},
	})
	sales: Sale[];

	@OneToMany(() => User, (u) => u.store)
	workers: User[];

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

	constructor(options?: Partial<Store>) {
		super(options);
	}
}
