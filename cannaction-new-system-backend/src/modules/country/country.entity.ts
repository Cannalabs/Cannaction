import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { RDSBase } from '../database/entities/rds-base.entity';

@Entity('country')
export class Country extends RDSBase<number> {
	@PrimaryGeneratedColumn('increment')
	id: number;

	@Column({ name: 'code' })
	code: string;

	@Column({ name: 'name' })
	name: string;


	setId(id: number): void {
		this.id = id;
	}
	getId(): number {
		return this.id;
	}

	constructor(options?: Partial<Country>) {
		super(options);
	}
}
