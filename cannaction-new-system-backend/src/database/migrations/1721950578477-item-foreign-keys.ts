import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class ItemForeignKeys1721950578477 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'item_store',
				schema: 'public',
				columns: [
					{
						name: 'item_id',
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
						columnNames: ['item_id'],
						referencedTableName: 'item',
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
