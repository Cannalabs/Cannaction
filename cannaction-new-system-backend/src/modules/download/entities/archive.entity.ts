import { Country } from '@/modules/country/country.entity';
import { RDSBase } from '@/modules/database/entities/rds-base.entity';
import { UserType } from '@/modules/user/enums/user-type.enum';
import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from 'typeorm';
import { Folder } from './folder.entity';

@Entity('archive')
export class Archive extends RDSBase<number> {
	@PrimaryGeneratedColumn('increment')
	id: number;

	@Column({ name: 'name' })
	name: string;

	@ManyToOne(() => Folder)
	@JoinColumn({ name: 'folder_id' })
	folder: Folder;

	@Column({ name: 'user_type', nullable: true })
	userType?: UserType;

	@ManyToOne(() => Country)
	@JoinColumn({ name: 'country_id' })
	country?: Country;

	@Column({ name: 'patch' })
	patch: string;

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

	constructor(options?: Partial<Archive>) {
		super(options);
	}
}
