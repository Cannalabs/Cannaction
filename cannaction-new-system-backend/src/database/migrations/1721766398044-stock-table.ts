import { getIdColumn, getTimestampColumns } from "@/utils/datasource-factory";
import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class StockTable1721766398044 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(new Table({
			name: 'stock',
			schema: 'public',
			columns: [
				getIdColumn(),
				{
					name: 'store_id',
					type: 'int',
					isNullable: false
				},
				{
					name: 'item_id',
					type: 'int',
					isNullable: false
				},
				{
					name: 'input',
					type: 'int',
					isNullable: false
				},
				{
					name: 'output',
					type: 'int',
					isNullable: false
				},
				{
					name: 'amount',
					type: 'int',
					isNullable: false
				},
				{
					name: 'total',
					type: 'int',
					isNullable: false
				},
				{
					name: 'balance',
					type: 'int',
					isNullable: false
				},
				...getTimestampColumns()
			]
		}));
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('stock');
	}

}
