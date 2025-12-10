import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class QuestionForeignKeys1721954517013 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {

		await queryRunner.createTable(
			new Table({
				name: 'quizz_question',
				schema: 'public',
				columns: [
					{
						name: 'question_id',
						type: 'int',
						isNullable: false,
					},
					{
						name: 'quizz_id',
						type: 'int',
						isNullable: false,
					},
				],
				foreignKeys: [
					{
						columnNames: ['question_id'],
						referencedTableName: 'question',
						referencedColumnNames: ['id'],
						referencedSchema: 'public',
						onUpdate: 'CASCADE',
						onDelete: 'CASCADE',
					},
					{
						columnNames: ['quizz_id'],
						referencedTableName: 'quizz',
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
