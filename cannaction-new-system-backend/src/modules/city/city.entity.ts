import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { RDSBase } from '../database/entities/rds-base.entity';
import { State } from '../state/state.entity';

@Entity('city')
export class City extends RDSBase<number> {
	@PrimaryGeneratedColumn('increment')
	id: number;

	@ManyToOne(() => State)
	@JoinColumn({ name: 'state_id' })
	state: State;

	@Column({ name: 'name' })
	name: string;

	setId(id: number): void {
		this.id = id;
	}
	getId(): number {
		return this.id;
	}

	constructor(options?: Partial<City>) {
		super(options);
	}
}
