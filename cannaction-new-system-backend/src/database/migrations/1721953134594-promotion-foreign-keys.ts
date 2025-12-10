import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class PromotionForeignKeys1721953134594 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createForeignKey(
			'promotion',
			new TableForeignKey({
				columnNames: ['country_id'],
				referencedTableName: 'country',
				referencedColumnNames: ['id'],
				referencedSchema: 'public',
				onUpdate: 'CASCADE',
				onDelete: 'SET NULL',
				name: 'fk_promotion_country',
			})
		);

		await queryRunner.createForeignKey(
			'promotion',
			new TableForeignKey({
				columnNames: ['item_id'],
				referencedTableName: 'item',
				referencedColumnNames: ['id'],
				referencedSchema: 'public',
				onUpdate: 'CASCADE',
				onDelete: 'SET NULL',
				name: 'fk_promotion_item',
			})
		);

		await queryRunner.createTable(
			new Table({
				name: 'promotion_store',
				schema: 'public',
				columns: [
					{
						name: 'promotion_id',
						type: 'int',
						isNullable: false,
					},
					{
						name: 'store_id',
						type: 'int',
						isNullable: false,
					},
				],
				foreignKeys: [
					{
						columnNames: ['promotion_id'],
						referencedTableName: 'promotion',
						referencedColumnNames: ['id'],
						referencedSchema: 'public',
						onUpdate: 'CASCADE',
						onDelete: 'CASCADE',
					},
					{
						columnNames: ['store_id'],
						referencedTableName: 'store',
						referencedColumnNames: ['id'],
						referencedSchema: 'public',
						onUpdate: 'CASCADE',
						onDelete: 'CASCADE',
					},
				]
			})
		)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
	}

}
