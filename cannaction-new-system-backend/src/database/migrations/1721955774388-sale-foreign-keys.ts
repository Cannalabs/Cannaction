import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class SaleForeignKeys1721955774388 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createForeignKey(
			'sale',
			new TableForeignKey({
				columnNames: ['item_id'],
				referencedTableName: 'item',
				referencedColumnNames: ['id'],
				referencedSchema: 'public',
				onUpdate: 'CASCADE',
				onDelete: 'SET NULL',
				name: 'fk_sale_item',
			})
		);

		await queryRunner.createForeignKey(
			'sale',
			new TableForeignKey({
				columnNames: ['user_id'],
				referencedTableName: 'user',
				referencedColumnNames: ['id'],
				referencedSchema: 'public',
				onUpdate: 'CASCADE',
				onDelete: 'SET NULL',
				name: 'fk_sale_user',
			})
		);

		await queryRunner.createTable(
			new Table({
				name: 'store_sale',
				schema: 'public',
				columns: [
					{
						name: 'sale_id',
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
						columnNames: ['sale_id'],
						referencedTableName: 'sale',
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
