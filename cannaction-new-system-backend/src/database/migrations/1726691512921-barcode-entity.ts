import { getIdColumn, getTimestampColumns } from "@/utils/datasource-factory";
import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class BarcodeEntity1726691512921 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(new Table({
			name: 'barcode',
			schema: 'public',
			columns: [
				getIdColumn(),
				{
					name: 'item_id',
					type: 'int',
					isNullable: false
				},
				{
					name: 'country_id',
					type: 'int',
					isNullable: false
				},
				{
					name: 'barcode',
					type: 'character varying',
					isNullable: false
				},
				...getTimestampColumns(),
			]
		}));

		await queryRunner.createForeignKey(
			'barcode',
			new TableForeignKey({
				columnNames: ['country_id'],
				referencedTableName: 'country',
				referencedColumnNames: ['id'],
				referencedSchema: 'public',
				onUpdate: 'CASCADE',
				onDelete: 'SET NULL',
				name: 'fk_barcode_country',
			})
		);
		await queryRunner.createForeignKey(
			'barcode',
			new TableForeignKey({
				columnNames: ['item_id'],
				referencedTableName: 'item',
				referencedColumnNames: ['id'],
				referencedSchema: 'public',
				onUpdate: 'CASCADE',
				onDelete: 'SET NULL',
				name: 'fk_barcode_item',
			})
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('barcode');
	}
}
