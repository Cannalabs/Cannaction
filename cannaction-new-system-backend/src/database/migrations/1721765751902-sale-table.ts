import { getIdColumn, getTimestampColumns } from "@/utils/datasource-factory";
import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class SaleTable1721765751902 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(new Table({
			name: 'sale',
			schema: 'public',
			columns: [
				getIdColumn(),
				{
					name: 'item_id',
					type: 'int',
					isNullable: false
				},
				{
					name: 'user_id',
					type: 'int',
					isNullable: false
				},
				...getTimestampColumns()
			]
		}));
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('sale');
	}

}
