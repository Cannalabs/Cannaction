import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export class ExtractUserIdColumn1723503953829 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.addColumn(
			'extract',
			new TableColumn({
				name: 'user_id',
				type: 'int',
				isNullable: true,
			})
		);

		await queryRunner.addColumn(
			'extract',
			new TableColumn({
				name: 'amount',
				type: 'int',
				isNullable: false,
			})
		);

		await queryRunner.createForeignKey(
			'extract',
			new TableForeignKey({
				columnNames: ['user_id'],
				referencedColumnNames: ['id'],
				referencedTableName: 'user',
				referencedSchema: 'public',
				onUpdate: 'CASCADE',
				onDelete: 'SET NULL',
			})
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropColumn('extract', 'user_id');
	}

}
