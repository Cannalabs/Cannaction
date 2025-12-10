import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

export class ExtractForeignKeys1721949254526 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createForeignKey(
			'extract',
			new TableForeignKey({
				columnNames: ['store_id'],
				referencedTableName: 'store',
				referencedColumnNames: ['id'],
				referencedSchema: 'public',
				onUpdate: 'CASCADE',
				onDelete: 'SET NULL',
				name: 'fk_extract_store',
			})
		);

		await queryRunner.createForeignKey(
			'extract',
			new TableForeignKey({
				columnNames: ['item_id'],
				referencedTableName: 'item',
				referencedColumnNames: ['id'],
				referencedSchema: 'public',
				onUpdate: 'CASCADE',
				onDelete: 'SET NULL',
				name: 'fk_extract_item',
			})
		);

	}

	public async down(queryRunner: QueryRunner): Promise<void> {
	}

}
