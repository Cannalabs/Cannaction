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
import { Store } from '../store/store.entity';
import { NewsletterUserType } from './enums/newsletter-user-type.enum';

@Entity('newsletter')
export class Newsletter extends RDSBase<number> {
	@PrimaryGeneratedColumn('increment')
	id: number;

	@Column({ name: 'title' })
	title: string;

	@Column({ name: 'description' })
	body: string;

	@Column({ name: 'footer' })
	footer: string;

	@Column({ name: 'published' })
	published: boolean;

	@Column({ name: 'user_type' })
	userType: NewsletterUserType;

	@ManyToOne(() => Country)
	@JoinColumn({ name: 'country_id' })
	country: Country;

	@ManyToMany(() => Store, (item) => item.newsletters, { cascade: true })
	@JoinTable({
		name: 'newsletter_store',
		joinColumn: {
			name: 'newsletter_id',
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

	constructor(options?: Partial<Newsletter>) {
		super(options);
	}
}
