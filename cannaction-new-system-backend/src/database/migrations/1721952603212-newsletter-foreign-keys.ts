import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class NewsletterForeignKeys1721952603212 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createForeignKey(
			'newsletter',
			new TableForeignKey({
				columnNames: ['country_id'],
				referencedTableName: 'country',
				referencedColumnNames: ['id'],
				referencedSchema: 'public',
				onUpdate: 'CASCADE',
				onDelete: 'SET NULL',
				name: 'fk_newsletter_country',
			})
		);

		await queryRunner.createTable(
			new Table({
				name: 'newsletter_store',
				schema: 'public',
				columns: [
					{
						name: 'newsletter_id',
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
						columnNames: ['newsletter_id'],
						referencedTableName: 'newsletter',
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
