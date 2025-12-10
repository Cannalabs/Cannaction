import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

export class NotificationForeignKeys1722371297946 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createForeignKey(
			'notification',
			new TableForeignKey({
				columnNames: ['country_id'],
				referencedTableName: 'country',
				referencedColumnNames: ['id'],
				referencedSchema: 'public',
				onUpdate: 'CASCADE',
				onDelete: 'SET NULL',
				name: 'fk_notification_country',
			})
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
	}

}
