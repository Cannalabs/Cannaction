import { getIdColumn, getTimestampColumns } from "@/utils/datasource-factory";
import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class UserNotificationTable1722981200119 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(new Table({
			name: 'user_notification',
			schema: 'public',
			columns: [
				getIdColumn(),
				{
					name: 'user_id',
					type: 'int',
					isNullable: false,
				},
				{
					name: 'notification_id',
					type: 'int',
					isNullable: false
				},
				{
					name: 'seen',
					type: 'boolean',
					isNullable: false
				},
				...getTimestampColumns()
			]
		}));
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('user_notification');
	}

}
