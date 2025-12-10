import { getIdColumn, getTimestampColumns } from "@/utils/datasource-factory";
import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class UserTargetTable1721769760829 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(new Table({
			name: 'user_target',
			schema: 'public',
			columns: [
				getIdColumn(),
				{
					name: 'store_id',
					type: 'int',
					isNullable: false
				},
				{
					name: 'user_id',
					type: 'int',
					isNullable: false
				},
				{
					name: 'prize_item_id',
					type: 'int',
					isNullable: false
				},
				{
					name: 'target',
					type: 'int',
					isNullable: false
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
				{
					name: 'target_final_date',
					type: 'timestamp with time zone',
					isNullable: false
				},
				...getTimestampColumns()
			]
		}));
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('user_target');
	}

}
