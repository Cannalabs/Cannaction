import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

export class StockForeignKeys1721956990914 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createForeignKey(
			'stock',
			new TableForeignKey({
				columnNames: ['store_id'],
				referencedTableName: 'store',
				referencedColumnNames: ['id'],
				referencedSchema: 'public',
				onUpdate: 'CASCADE',
				onDelete: 'SET NULL',
				name: 'fk_stock_store',
			})
		);

		await queryRunner.createForeignKey(
			'stock',
			new TableForeignKey({
				columnNames: ['item_id'],
				referencedTableName: 'item',
				referencedColumnNames: ['id'],
				referencedSchema: 'public',
				onUpdate: 'CASCADE',
				onDelete: 'SET NULL',
				name: 'fk_stock_item',
			})
		);

	}

	public async down(queryRunner: QueryRunner): Promise<void> {
	}

}
