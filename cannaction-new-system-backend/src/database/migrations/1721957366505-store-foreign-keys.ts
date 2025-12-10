import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

export class StoreForeignKeys1721957366505 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createForeignKey(
			'store',
			new TableForeignKey({
				columnNames: ['country_id'],
				referencedTableName: 'country',
				referencedColumnNames: ['id'],
				referencedSchema: 'public',
				onUpdate: 'CASCADE',
				onDelete: 'SET NULL',
				name: 'fk_store_country',
			})
		);

		await queryRunner.createForeignKey(
			'store',
			new TableForeignKey({
				columnNames: ['state_id'],
				referencedTableName: 'state',
				referencedColumnNames: ['id'],
				referencedSchema: 'public',
				onUpdate: 'CASCADE',
				onDelete: 'SET NULL',
				name: 'fk_store_state',
			})
		);

		await queryRunner.createForeignKey(
			'store',
			new TableForeignKey({
				columnNames: ['city_id'],
				referencedTableName: 'city',
				referencedColumnNames: ['id'],
				referencedSchema: 'public',
				onUpdate: 'CASCADE',
				onDelete: 'SET NULL',
				name: 'fk_store_city',
			})
		);

		await queryRunner.createForeignKey(
			'store',
			new TableForeignKey({
				columnNames: ['master_user_id'],
				referencedTableName: 'user',
				referencedColumnNames: ['id'],
				referencedSchema: 'public',
				onUpdate: 'CASCADE',
				onDelete: 'SET NULL',
				name: 'fk_store_user',
			})
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
	}

}
