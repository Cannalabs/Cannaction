import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { Country } from '../country/country.entity';
import { RDSBase } from '../database/entities/rds-base.entity';
import { Language } from '../language/language.entity';
import { Store } from '../store/store.entity';
import { UserType } from './enums/user-type.enum';
import { UserMoreInformationType } from './types/user-more-information.type';

@Entity('user')
export class User extends RDSBase<number> {
	@PrimaryGeneratedColumn('increment')
	id: number;

	@Column({ name: 'code' })
	code: string;

	@Column({ name: 'name', nullable: true })
	name?: string;

	@Column({ name: 'last_name', nullable: true })
	lastName?: string;

	@Column({ name: 'profile_pic', nullable: true })
	profilePic?: string;

	@Column({ name: 'nickname', nullable: true })
	nickname?: string;

	@Column({ name: 'email', nullable: true })
	email?: string;

	@Column({ name: 'password', select: false, nullable: true })
	password?: string;

	@Column({ name: 'telephone', nullable: true })
	telephone?: string;

	@Column({ name: 'birthdate', nullable: true })
	birthdate?: Date;

	@Column({ name: 'points', nullable: false, default: 0 })
	points: number;

	@Column({ name: 'gender', nullable: true })
	gender?: string;

	@Column({ name: 'user_type' })
	userType: UserType;

	@Column({ name: 'active' })
	active: boolean;

	@ManyToOne(() => Language)
	@JoinColumn({ name: 'language_id' })
	language: Language;

	@Column({ name: 'more_information', type: 'json', nullable: true })
	moreInformation?: UserMoreInformationType[];

	@ManyToOne(() => Store)
	@JoinColumn({ name: 'store_id' })
	store?: Store;

	@ManyToOne(() => Country)
	@JoinColumn({ name: 'country_id' })
	country: Country;

	@Column({ name: 'newsletter' })
	newsletter: boolean;

	@CreateDateColumn({ name: 'created_at' })
	createdAt: Date;

	@UpdateDateColumn({ name: 'updated_at' })
	updatedAt: Date;

	@Column({ name: 'last_interaction_date', nullable: true })
	lastInteractionDate?: Date;

	setId(id: number): void {
		this.id = id;
	}
	getId(): number {
		return this.id;
	}

	constructor(options?: Partial<User>) {
		super(options);
	}
}

