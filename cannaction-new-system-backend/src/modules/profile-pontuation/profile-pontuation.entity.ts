import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { RDSBase } from '../database/entities/rds-base.entity';

@Entity('profile_pontuation')
export class ProfilePontuation extends RDSBase<number> {
	@PrimaryGeneratedColumn('increment')
	id: number;

	@Column({ name: 'type' })
	type: string;

	@Column({ name: 'description' })
	description: string;

	@Column({ name: 'active' })
	active: boolean;

	@Column({ name: 'points' })
	points: number;

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

	constructor(options?: Partial<ProfilePontuation>) {
		super(options);
	}
}
