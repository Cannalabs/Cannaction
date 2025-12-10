import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

export class UserTargetForeignKeys1721958513999 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createForeignKey(
			'user_target',
			new TableForeignKey({
				columnNames: ['store_id'],
				referencedTableName: 'store',
				referencedColumnNames: ['id'],
				referencedSchema: 'public',
				onUpdate: 'CASCADE',
				onDelete: 'SET NULL',
				name: 'fk_user_target_store',
			})
		);

		await queryRunner.createForeignKey(
			'user_target',
			new TableForeignKey({
				columnNames: ['user_id'],
				referencedTableName: 'user',
				referencedColumnNames: ['id'],
				referencedSchema: 'public',
				onUpdate: 'CASCADE',
				onDelete: 'SET NULL',
				name: 'fk_user_target_user',
			})
		);

		await queryRunner.createForeignKey(
			'user_target',
			new TableForeignKey({
				columnNames: ['prize_item_id'],
				referencedTableName: 'item',
				referencedColumnNames: ['id'],
				referencedSchema: 'public',
				onUpdate: 'CASCADE',
				onDelete: 'SET NULL',
				name: 'fk_user_target_item',
			})
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
	}

}
