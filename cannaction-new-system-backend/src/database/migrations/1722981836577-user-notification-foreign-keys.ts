import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

export class UserNotificationForeignKeys1722981836577 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createForeignKey(
			'user_notification',
			new TableForeignKey({
				columnNames: ['user_id'],
				referencedTableName: 'user',
				referencedColumnNames: ['id'],
				referencedSchema: 'public',
				onUpdate: 'CASCADE',
				onDelete: 'SET NULL',
				name: 'fk_user_notification_user',
			})
		);

		await queryRunner.createForeignKey(
			'user_notification',
			new TableForeignKey({
				columnNames: ['notification_id'],
				referencedTableName: 'notification',
				referencedColumnNames: ['id'],
				referencedSchema: 'public',
				onUpdate: 'CASCADE',
				onDelete: 'SET NULL',
				name: 'fk_user_notification_notification',
			})
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
	}

}
