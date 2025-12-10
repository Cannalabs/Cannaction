import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

export class StoreTargetForeignKeys1721957867525 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createForeignKey(
			'store_target',
			new TableForeignKey({
				columnNames: ['store_id'],
				referencedTableName: 'store',
				referencedColumnNames: ['id'],
				referencedSchema: 'public',
				onUpdate: 'CASCADE',
				onDelete: 'SET NULL',
				name: 'fk_store_target_store',
			})
		);

		await queryRunner.createForeignKey(
			'store_target',
			new TableForeignKey({
				columnNames: ['prize_item_id'],
				referencedTableName: 'item',
				referencedColumnNames: ['id'],
				referencedSchema: 'public',
				onUpdate: 'CASCADE',
				onDelete: 'SET NULL',
				name: 'fk_store_target_item',
			})
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
	}

}
