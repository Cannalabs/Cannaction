import { getIdColumn, getTimestampColumns } from "@/utils/datasource-factory";
import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class ChangeShopTable1721686054273 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(new Table({
			name: 'change_shop',
			schema: 'public',
			columns: [
				getIdColumn(),
				{
					name: 'user_id',
					type: 'int',
					isNullable: false
				},
				{
					name: 'origin_store_id',
					type: 'int',
					isNullable: false
				},
				{
					name: 'destiny_store_id',
					type: 'int',
					isNullable: false
				},
				{
					name: 'reason',
					type: 'character varying',
					isNullable: false
				},
				{
					name: 'aproved',
					type: 'boolean',
					isNullable: true
				},
				{
					name: 'answer_date',
					type: 'timestamp with time zone',
					isNullable: true
				},
				...getTimestampColumns()

			]
		}));
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('change_shop');
	}

}
