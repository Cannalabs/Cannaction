import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { RDSBase } from '../database/entities/rds-base.entity';

@Entity('club_card_code_list')
export class ClubCardCodeList extends RDSBase<number> {
	@PrimaryGeneratedColumn('increment')
	id: number;

	@Column({ name: 'code' })
	code: string;

	@Column({ name: 'validated' })
	validated: boolean;

	setId(id: number): void {
		this.id = id;
	}
	getId(): number {
		return this.id;
	}

	constructor(options?: Partial<ClubCardCodeList>) {
		super(options);
	}
}
