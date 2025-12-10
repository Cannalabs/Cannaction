import { RDSBase } from '@/modules/database/entities/rds-base.entity';
import {
	Column,
	CreateDateColumn,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from 'typeorm';
import { Archive } from './archive.entity';

@Entity('folder')
export class Folder extends RDSBase<number> {
	@PrimaryGeneratedColumn('increment')
	id: number;

	@Column({ name: 'name' })
	name: string;

	@OneToMany(() => Archive, (item) => item.folder)
	archives: Archive[];

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

	constructor(options?: Partial<Folder>) {
		super(options);
	}
}
