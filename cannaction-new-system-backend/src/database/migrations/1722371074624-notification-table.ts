import { getIdColumn, getTimestampColumns } from "@/utils/datasource-factory";
import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class NotificationTable1722371074624 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(new Table({
			name: 'notification',
			schema: 'public',
			columns: [
				getIdColumn(),
				{
					name: 'title',
					type: 'character varying',
					isNullable: false,
				},
				{
					name: 'body',
					type: 'character varying',
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
					name: 'user_type',
					type: 'character varying',
					isNullable: false
				},
				...getTimestampColumns()

			]
		}));
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('notification');
	}

}
