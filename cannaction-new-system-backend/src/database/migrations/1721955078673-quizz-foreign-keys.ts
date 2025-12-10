import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

export class QuizzForeignKeys1721955078673 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createForeignKey(
			'quizz',
			new TableForeignKey({
				columnNames: ['country_id'],
				referencedTableName: 'country',
				referencedColumnNames: ['id'],
				referencedSchema: 'public',
				onUpdate: 'CASCADE',
				onDelete: 'SET NULL',
				name: 'fk_quizz_country',
			})
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
	}

}
