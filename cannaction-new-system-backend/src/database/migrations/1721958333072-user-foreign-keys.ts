import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

export class UserForeignKeys1721958333072 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createForeignKey(
			'user',
			new TableForeignKey({
				columnNames: ['language_id'],
				referencedTableName: 'language',
				referencedColumnNames: ['id'],
				referencedSchema: 'public',
				onUpdate: 'CASCADE',
				onDelete: 'SET NULL',
				name: 'fk_user_language',
			})
		);

		await queryRunner.createForeignKey(
			'user',
			new TableForeignKey({
				columnNames: ['store_id'],
				referencedTableName: 'store',
				referencedColumnNames: ['id'],
				referencedSchema: 'public',
				onUpdate: 'CASCADE',
				onDelete: 'SET NULL',
				name: 'fk_user_store',
			})
		);

		await queryRunner.createForeignKey(
			'user',
			new TableForeignKey({
				columnNames: ['country_id'],
				referencedTableName: 'country',
				referencedColumnNames: ['id'],
				referencedSchema: 'public',
				onUpdate: 'CASCADE',
				onDelete: 'SET NULL',
				name: 'fk_user_country',
			})
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
	}

}
