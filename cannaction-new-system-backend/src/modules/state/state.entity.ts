import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { Country } from '../country/country.entity';
import { RDSBase } from '../database/entities/rds-base.entity';

@Entity('state')
export class State extends RDSBase<number> {
	@PrimaryGeneratedColumn('increment')
	id: number;

	@ManyToOne(() => Country)
	@JoinColumn({ name: 'country_id' })
	country: Country;

	@Column({ name: 'name' })
	name: string;

	setId(id: number): void {
		this.id = id;
	}
	getId(): number {
		return this.id;
	}

	constructor(options?: Partial<State>) {
		super(options);
	}
}
