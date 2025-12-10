import { getIdColumn, getTimestampColumns } from "@/utils/datasource-factory";
import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CouponTable1721761225201 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(new Table({
			name: 'coupon',
			schema: 'public',
			columns: [
				getIdColumn(),
				{
					name: 'key_code',
					type: 'character varying',
					isNullable: false
				},
				{
					name: 'promotion_id',
					type: 'int',
					isNullable: false
				},
				{
					name: 'item_id',
					type: 'int',
					isNullable: true
				},
				{
					name: 'user_id',
					type: 'int',
					isNullable: true
				},
				{
					name: 'store_id',
					type: 'int',
					isNullable: false
				},
				{
					name: 'description',
					type: 'character varying',
					isNullable: true
				},
				{
					name: 'checked_date',
					type: 'timestamp with time zone',
					isNullable: true
				},
				{
					name: 'checked',
					type: 'boolean',
					isNullable: false
				},
				...getTimestampColumns()
			]
		}));
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('coupon');
	}

}
