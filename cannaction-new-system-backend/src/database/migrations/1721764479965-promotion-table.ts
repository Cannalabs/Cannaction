import { getIdColumn, getTimestampColumns } from "@/utils/datasource-factory";
import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class PromotionTable1721764479965 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(new Table({
			name: 'promotion',
			schema: 'public',
			columns: [
				getIdColumn(),
				{
					name: 'name',
					type: 'character varying',
					isNullable: false
				},
				{
					name: 'email_text',
					type: 'character varying',
					isNullable: false
				},
				{
					name: 'coupons',
					type: 'int',
					isNullable: false
				},
				{
					name: 'active',
					type: 'boolean',
					isNullable: false
				},
				{
					name: 'country_id',
					type: 'int',
					isNullable: false
				},
				{
					name: 'begin_date',
					type: 'timestamp with time zone',
					isNullable: false
				},
				{
					name: 'final_date',
					type: 'timestamp with time zone',
					isNullable: false
				},
				{
					name: 'item_id',
					type: 'int',
					isNullable: false
				},
				...getTimestampColumns(),
				{
					name: 'last_interaction_date',
					type: 'timestamp with time zone',
					isNullable: false
				},
			]
		}));
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('promotion');
	}

}
