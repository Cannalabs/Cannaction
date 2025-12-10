import { getIdColumn, getTimestampColumns } from "@/utils/datasource-factory";
import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class StoreTargetTable1721768270707 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(new Table({
			name: 'store_target',
			schema: 'public',
			columns: [
				getIdColumn(),
				{
					name: 'store_id',
					type: 'int',
					isNullable: false
				},
				{
					name: 'target',
					type: 'int',
					isNullable: false
				},
				{
					name: 'final_date_target',
					type: 'timestamp with time zone',
					isNullable: false
				},
				{
					name: 'prize_type',
					type: 'character varying',
					isNullable: false
				},
				{
					name: 'prize_item_id',
					type: 'int',
					isNullable: true
				},
				{
					name: 'prize_money',
					type: 'int',
					isNullable: true
				},
				{
					name: 'progress',
					type: 'int',
					isNullable: false
				},
				{
					name: 'success',
					type: 'boolean',
					isNullable: true
				},
				{
					name: 'active',
					type: 'boolean',
					isNullable: false
				},
				...getTimestampColumns()
			]
		}));
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('store_target');
	}

}
