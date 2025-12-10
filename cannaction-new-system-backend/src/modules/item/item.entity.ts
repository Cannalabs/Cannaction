import {
	Column,
	CreateDateColumn,
	Entity,
	JoinTable,
	ManyToMany,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { Barcode } from '../barcode/barcode.entity';
import { RDSBase } from '../database/entities/rds-base.entity';
import { Sale } from '../sale/sale.entity';
import { Store } from '../store/store.entity';
import { ClothingSize } from './enums/clothing-size.enum';
import { ItemType } from './enums/item-type.enum';

@Entity('item')
export class Item extends RDSBase<number> {
	@PrimaryGeneratedColumn('increment')
	id: number;

	@Column({ name: 'name' })
	name: string;

	@Column({ name: 'description', nullable: true })
	description?: string;

	@Column({ name: 'image', nullable: true })
	image?: string;

	@Column({ name: 'dots', nullable: true })
	dots?: number;

	@Column({ name: 'active' })
	active: boolean;

	@Column({ name: 'size', nullable: true })
	size?: ClothingSize;

	@Column({ name: 'type' })
	type: ItemType;

	@Column({ name: 'points' })
	points: number;

	@ManyToMany(() => Store, (item) => item.items, { cascade: true })
	@JoinTable({
		name: 'item_store',
		joinColumn: {
			name: 'item_id',
			referencedColumnName: 'id',
		},
		inverseJoinColumn: {
			name: 'store_id',
			referencedColumnName: 'id',
		},
	})
	stores: Store[];

	@OneToMany(() => Sale, (item) => item.item)
	sales: Sale[];

	@OneToMany(() => Barcode, (item) => item.item)
	barcodes: Barcode[];

	@Column({ name: 'exchange' })
	exchange: boolean;

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

	constructor(options?: Partial<Item>) {
		super(options);
	}
}
